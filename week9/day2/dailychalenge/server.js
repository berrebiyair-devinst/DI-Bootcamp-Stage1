const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const emojis = [
    { emoji: "😀", name: "Smile" },
    { emoji: "🐶", name: "Dog" },
    { emoji: "🌮", name: "Taco" },
    { emoji: "🐱", name: "Cat" },
    { emoji: "🍕", name: "Pizza" },
    { emoji: "⚽", name: "Football" }
];

let currentEmoji;
let score = 0;
let scores = [];

// Générer une nouvelle question
app.get("/api/game", (req, res) => {
    currentEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const wrongAnswers = emojis
        .filter((item) => item.name !== currentEmoji.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((item) => item.name);

    const options = [...wrongAnswers, currentEmoji.name]
        .sort(() => Math.random() - 0.5);

    res.json({
        emoji: currentEmoji.emoji,
        options: options
    });
});

// Vérifier la réponse
app.post("/api/guess", (req, res) => {
    const guess = req.body.guess;

    if (guess === currentEmoji.name) {
        score++;

        return res.json({
            correct: true,
            message: "Correct! 🎉",
            score: score
        });
    }

    res.json({
        correct: false,
        message: `Wrong! The answer was ${currentEmoji.name}`,
        score: score
    });
});

// Enregistrer un score
app.post("/api/scores", (req, res) => {
    const player = req.body.player;

    scores.push({
        player: player,
        score: score
    });

    scores.sort((a, b) => b.score - a.score);

    res.json(scores);
});

// Tableau des scores
app.get("/api/scores", (req, res) => {
    res.json(scores);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});