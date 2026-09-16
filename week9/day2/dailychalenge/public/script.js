const emojiElement = document.getElementById("emoji");
const optionsElement = document.getElementById("options");
const form = document.getElementById("gameForm");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score");

async function loadGame() {
    const response = await fetch("/api/game");
    const data = await response.json();

    emojiElement.textContent = data.emoji;
    optionsElement.innerHTML = "";

    data.options.forEach((option) => {
        const label = document.createElement("label");

        label.innerHTML = `
            <input type="radio" name="guess" value="${option}" required>
            ${option}
        `;

        optionsElement.appendChild(label);
        optionsElement.appendChild(document.createElement("br"));
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selected = document.querySelector(
        'input[name="guess"]:checked'
    );

    const response = await fetch("/api/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            guess: selected.value
        })
    });

    const data = await response.json();

    messageElement.textContent = data.message;
    scoreElement.textContent = data.score;

    setTimeout(loadGame, 1000);
});

loadGame();