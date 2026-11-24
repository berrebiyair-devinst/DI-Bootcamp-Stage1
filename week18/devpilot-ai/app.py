import asyncio
import streamlit as st

from client import run_agent


# CONFIGURATION DE LA PAGE

st.set_page_config(
    page_title="DevPilot AI",
    page_icon="🤖",
    layout="centered"
)

st.title("🤖 DevPilot AI")

st.caption(
    "Assistant développeur avec Grok xAI + MCP"
)

st.info(
    "Serveurs connectés : "
    "Filesystem MCP | Git MCP | Project Analyzer"
)


# HISTORIQUE DES MESSAGES

if "messages" not in st.session_state:
    st.session_state.messages = []


# AFFICHAGE DES ANCIENS MESSAGES

for message in st.session_state.messages:

    with st.chat_message(message["role"]):

        st.markdown(message["content"])

        if message.get("tools"):

            with st.expander("Outils MCP utilisés"):

                for tool in message["tools"]:
                    st.code(tool)


# NOUVELLE QUESTION

prompt = st.chat_input(
    "Pose une question sur ton projet..."
)

if prompt:

    history = [
        {
            "role": message["role"],
            "content": message["content"]
        }
        for message in st.session_state.messages
    ]

    st.session_state.messages.append({
        "role": "user",
        "content": prompt
    })

    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):

        with st.spinner(
            "Grok analyse ton projet avec MCP..."
        ):

            answer, tools = asyncio.run(
                run_agent(prompt, history)
            )

        st.markdown(answer)

        if tools:

            with st.expander("Outils MCP utilisés"):

                for tool in tools:
                    st.code(tool)

    st.session_state.messages.append({
        "role": "assistant",
        "content": answer,
        "tools": tools
    })