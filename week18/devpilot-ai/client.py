
import asyncio
import json
import logging
import os
import subprocess
import sys

from contextlib import AsyncExitStack
from pathlib import Path

from dotenv import load_dotenv
from openai import AsyncOpenAI, APIStatusError, APIConnectionError

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp.types import Root, ListRootsResult


# ==========================================
# 1. CONFIGURATION
# ==========================================

PROJECT_DIR = Path(__file__).resolve().parent

load_dotenv(PROJECT_DIR / ".env")

XAI_API_KEY = os.getenv("XAI_API_KEY", "")
XAI_MODEL = os.getenv("XAI_MODEL", "grok-4.7")

logging.basicConfig(
    filename=str(PROJECT_DIR / "devpilot.log"),
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger("DevPilot")


def get_repository_path():
    try:
        return subprocess.check_output(
            ["git", "rev-parse", "--show-toplevel"],
            cwd=PROJECT_DIR,
            text=True,
            stderr=subprocess.DEVNULL
        ).strip()

    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


REPO_DIR = get_repository_path()


# ==========================================
# 2. CONFIGURATION DES SERVEURS MCP
# ==========================================

filesystem_server = StdioServerParameters(
    command="node",
    args=[
        str(
            PROJECT_DIR
            / "node_modules"
            / "@modelcontextprotocol"
            / "server-filesystem"
            / "dist"
            / "index.js"
        ),
        str(PROJECT_DIR)
    ]
)

git_server = StdioServerParameters(
    command=sys.executable,
    args=[
        "-m",
        "mcp_server_git",
        "--repository",
        REPO_DIR or str(PROJECT_DIR)
    ]
)

analyzer_server = StdioServerParameters(
    command=sys.executable,
    args=[
        str(PROJECT_DIR / "analyzer_server.py")
    ]
)

SERVERS = {
    "filesystem": filesystem_server,
    "git": git_server,
    "analyzer": analyzer_server
}


# ==========================================
# 3. OUTILS AUTORISÉS
# ==========================================

ALLOWED_TOOLS = {
    "filesystem": {
        "list_directory",
        "read_text_file",
        "list_allowed_directories"
    },
    "git": {
        "git_status",
        "git_log",
        "git_diff_unstaged"
    },
    "analyzer": {
        "analyze_project"
    }
}

BLOCKED_DIRS = {
    ".venv",
    "node_modules",
    ".git",
    "__pycache__",
    ".ssh"
}

BLOCKED_FILES = {
    "devpilot.log",
    "mcp_server.log"
}


# ==========================================
# 4. ROOTS MCP
# ==========================================

async def provide_roots(context):
    return ListRootsResult(
        roots=[
            Root(
                uri=PROJECT_DIR.as_uri(),
                name="DevPilot AI"
            )
        ]
    )


# ==========================================
# 5. SÉCURITÉ DES FICHIERS
# ==========================================

def secure_path(value):
    path = Path(value)

    if not path.is_absolute():
        path = PROJECT_DIR / path

    path = path.resolve()

    if not path.is_relative_to(PROJECT_DIR):
        raise ValueError(
            "Accès refusé : chemin hors du projet."
        )

    relative = path.relative_to(PROJECT_DIR)

    if any(
        part.lower() in BLOCKED_DIRS
        for part in relative.parts
    ):
        raise ValueError("Accès à un dossier protégé.")

    if any(
        part.lower().startswith(".env")
        for part in relative.parts
    ):
        raise ValueError("Fichier de configuration protégé.")

    if path.name.lower() in BLOCKED_FILES:
        raise ValueError("Fichier journal protégé.")

    return str(path)


def prepare_arguments(server_name, tool_name, arguments):
    args = dict(arguments)

    if server_name == "filesystem":

        if "path" in args:
            args["path"] = secure_path(args["path"])

        if tool_name == "read_text_file":
            if "path" not in args:
                raise ValueError("Chemin manquant.")

            path = Path(args["path"])

            allowed_extensions = {
                ".py", ".js", ".jsx", ".ts", ".tsx",
                ".html", ".css", ".md", ".json",
                ".txt", ".yaml", ".yml"
            }

            if path.suffix.lower() not in allowed_extensions:
                raise ValueError(
                    "Type de fichier non autorisé."
                )

            args.pop("tail", None)

            args["head"] = min(
                max(int(args.get("head", 120)), 1),
                200
            )

    elif server_name == "git":

        if not REPO_DIR:
            raise ValueError("Dépôt Git introuvable.")

        args["repo_path"] = REPO_DIR

        if tool_name == "git_log":
            args["max_count"] = min(
                max(int(args.get("max_count", 5)), 1),
                10
            )

    return args


# ==========================================
# 6. CONNEXION À UN SERVEUR MCP
# ==========================================

async def connect_server(
    stack,
    server_name,
    configuration,
    error_log
):
    read, write = await stack.enter_async_context(
        stdio_client(
            configuration,
            errlog=error_log
        )
    )

    options = {}

    if server_name == "filesystem":
        options["list_roots_callback"] = provide_roots

    session = await stack.enter_async_context(
        ClientSession(read, write, **options)
    )

    await session.initialize()

    discovered = await session.list_tools()

    logger.info(
        "Serveur %s connecté : %s outils",
        server_name,
        len(discovered.tools)
    )

    return session, discovered.tools


# ==========================================
# 7. ORCHESTRATION MCP + GROK XAI
# ==========================================

async def run_once(question, history=None):

    if not XAI_API_KEY:
        return (
            "Clé XAI_API_KEY manquante dans le fichier .env.",
            []
        )

    messages = [
        {
            "role": "system",
            "content": (
                "Tu es DevPilot AI, un assistant développeur. "
                "Tu aides à comprendre les projets Python, "
                "JavaScript, React, Node.js et Git. "
                "Réponds en français de manière pédagogique. "
                "Utilise les outils MCP lorsque cela est utile. "
                "N'invente jamais le résultat d'un outil. "
                "Ne modifie jamais les fichiers. "
                "Si un outil échoue, explique-le clairement."
            )
        }
    ]

    if history:
        messages.extend(history[-6:])

    messages.append({
        "role": "user",
        "content": question
    })

    used_tools = []

    with open(
        PROJECT_DIR / "mcp_server.log",
        "a",
        encoding="utf-8"
    ) as error_log:

        async with AsyncExitStack() as stack:

            sessions = {}
            available_tools = []
            registry = {}
            connection_errors = []

            # Connexion aux trois serveurs
            for server_name, configuration in SERVERS.items():

                try:
                    session, discovered = await connect_server(
                        stack,
                        server_name,
                        configuration,
                        error_log
                    )

                    sessions[server_name] = session

                    for tool in discovered:

                        if tool.name not in ALLOWED_TOOLS[server_name]:
                            continue

                        public_name = (
                            f"{server_name}__{tool.name}"
                        )

                        registry[public_name] = (
                            server_name,
                            tool.name
                        )

                        schema = getattr(
                            tool, "input_schema", None
                        )

                        if schema is None:
                            schema = getattr(
                                tool, "inputSchema", None
                            )

                        available_tools.append({
                            "type": "function",
                            "function": {
                                "name": public_name,
                                "description": (
                                    tool.description or tool.name
                                )[:1000],
                                "parameters": schema or {
                                    "type": "object",
                                    "properties": {}
                                }
                            }
                        })

                except Exception as error:
                    logger.exception(
                        "Échec de connexion : %s",
                        server_name
                    )

                    connection_errors.append(
                        f"{server_name}: {error}"
                    )

            if not available_tools:
                return (
                    "Aucun outil MCP disponible.\n\n"
                    + "\n".join(connection_errors)
                    + "\nConsulte mcp_server.log.",
                    []
                )

            # Connexion à Grok
            async with AsyncOpenAI(
                api_key=XAI_API_KEY,
                base_url="https://api.x.ai/v1",
                timeout=60,
                max_retries=1
            ) as ai:

                for step in range(5):

                    # ==================================
                    # APPEL À GROK AVEC ERREURS LISIBLES
                    # ==================================

                    try:
                        response = await ai.chat.completions.create(
                            model=XAI_MODEL,
                            messages=messages,
                            tools=available_tools,
                            tool_choice="auto"
                        )

                    except APIStatusError as error:

                        details = str(
                            error.body or error.message
                        )

                        logger.error(
                            "Erreur API xAI %s : %s",
                            error.status_code,
                            details
                        )

                        return (
                            f"Grok a refusé la requête "
                            f"(HTTP {error.status_code}).\n\n"
                            f"{details}",
                            used_tools
                        )

                    except APIConnectionError as error:

                        logger.exception(
                            "Erreur de connexion xAI"
                        )

                        return (
                            "Impossible de contacter l'API xAI.\n"
                            f"Détails : {error}",
                            used_tools
                        )

                    message = response.choices[0].message

                    # Réponse finale de Grok
                    if not message.tool_calls:

                        answer = (
                            message.content
                            or "Analyse terminée."
                        )

                        if connection_errors:
                            answer += (
                                "\n\nCertains serveurs MCP "
                                "n'ont pas pu être connectés :\n"
                                + "\n".join(connection_errors)
                            )

                        return answer, used_tools

                    # Grok demande des outils
                    messages.append({
                        "role": "assistant",
                        "content": message.content or "",
                        "tool_calls": [
                            {
                                "id": call.id,
                                "type": "function",
                                "function": {
                                    "name": call.function.name,
                                    "arguments": (
                                        call.function.arguments
                                    )
                                }
                            }
                            for call in message.tool_calls
                        ]
                    })

                    # ==================================
                    # EXÉCUTION DES OUTILS MCP
                    # ==================================

                    for call in message.tool_calls:

                        public_name = call.function.name

                        try:
                            if public_name not in registry:
                                raise ValueError(
                                    "Outil non autorisé."
                                )

                            server_name, tool_name = registry[
                                public_name
                            ]

                            arguments = json.loads(
                                call.function.arguments or "{}"
                            )

                            arguments = prepare_arguments(
                                server_name,
                                tool_name,
                                arguments
                            )

                            result = await sessions[
                                server_name
                            ].call_tool(
                                tool_name,
                                arguments=arguments
                            )

                            output = "\n".join(
                                item.text
                                for item in result.content
                                if item.type == "text"
                            )

                            if result.is_error:
                                output = (
                                    "Erreur MCP : " + output
                                )

                            used_tools.append(public_name)

                            logger.info(
                                "Outil exécuté : %s",
                                public_name
                            )

                        except Exception as error:

                            logger.exception(
                                "Erreur dans l'outil %s",
                                public_name
                            )

                            output = (
                                f"Erreur outil : {error}"
                            )

                        messages.append({
                            "role": "tool",
                            "tool_call_id": call.id,
                            "content": output[:10000]
                        })

                return (
                    "Limite de 5 étapes atteinte. "
                    "Reformule ta demande.",
                    used_tools
                )


# ==========================================
# 8. GESTION DES ERREURS
# ==========================================

def describe_error(error):
    if isinstance(error, BaseExceptionGroup):
        parts = [
            describe_error(sub_error)
            for sub_error in error.exceptions
        ]
        return " | ".join(parts)

    return f"{type(error).__name__}: {error}"


async def run_agent(question, history=None):

    for attempt in range(2):

        try:
            return await run_once(question, history)

        except Exception as error:

            logger.exception(
                "Tentative %s échouée",
                attempt + 1
            )

            if attempt == 0:
                await asyncio.sleep(1)

            else:
                return (
                    "Erreur pendant l'exécution :\n\n"
                    + describe_error(error)
                    + "\n\nConsulte devpilot.log "
                    "et mcp_server.log.",
                    []
                )


# ==========================================
# 9. MODE TERMINAL
# ==========================================

if __name__ == "__main__":

    question = input(
        "Question pour DevPilot AI : "
    )

    answer, tools = asyncio.run(
        run_agent(question)
    )

    print("\n--- Réponse de Grok ---")
    print(answer)

    print("\n--- Outils MCP utilisés ---")
    print(tools)
