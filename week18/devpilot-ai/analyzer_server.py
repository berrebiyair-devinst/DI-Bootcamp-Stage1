import os
from collections import Counter
from pathlib import Path

from mcp.server import MCPServer

mcp = MCPServer("DevPilot Analyzer")

PROJECT_DIR = Path(__file__).resolve().parent

IGNORED_DIRS = {
    ".venv",
    "node_modules",
    ".git",
    "__pycache__",
    "dist",
    "build",
    ".next"
}


@mcp.tool()
def analyze_project() -> dict:
    """Analyse les fichiers, dossiers et technologies du projet."""

    extensions = Counter()
    total_files = 0
    total_folders = 0

    for root, dirs, files in os.walk(PROJECT_DIR):
        dirs[:] = [
            directory
            for directory in dirs
            if directory not in IGNORED_DIRS
        ]

        total_folders += len(dirs)

        for filename in files:
            if filename.startswith(".env"):
                continue

            if filename.endswith(".log"):
                continue

            total_files += 1

            extension = Path(filename).suffix.lower()

            if extension:
                extensions[extension] += 1

    technologies = []

    if extensions[".py"]:
        technologies.append("Python")

    if extensions[".js"] or extensions[".jsx"]:
        technologies.append("JavaScript")

    if extensions[".ts"] or extensions[".tsx"]:
        technologies.append("TypeScript")

    if extensions[".html"]:
        technologies.append("HTML")

    if extensions[".css"]:
        technologies.append("CSS")

    if (PROJECT_DIR / "package.json").exists():
        technologies.append("Node.js")

    return {
        "project": PROJECT_DIR.name,
        "total_files": total_files,
        "total_folders": total_folders,
        "extensions": dict(extensions),
        "technologies": technologies,
        "has_readme": (PROJECT_DIR / "README.md").exists(),
        "has_gitignore": (PROJECT_DIR / ".gitignore").exists()
    }


if __name__ == "__main__":
    mcp.run()