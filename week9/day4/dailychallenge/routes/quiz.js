const express = require('express');
const router = express.Router();

const triviaQuestions = [
    {
        question: 'What is the capital of France?',
        answer: 'Paris'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answer: 'Mars'
    },
    {
        question: 'What is the largest mammal in the world?',
        answer: 'Blue whale'
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Démarrer ou recommencer le quiz
router.get('/', (req, res) => {
    currentQuestionIndex = 0;
    score = 0;

    res.status(200).json({
        message: 'Quiz started!',
        questionNumber: 1,
        question: triviaQuestions[0].question
    });
});

// Envoyer une réponse et passer à la question suivante
router.post('/', (req, res) => {
    const userAnswer = req.body.answer;

    if (!userAnswer) {
        return res.status(400).json({
            message: 'Please provide an answer'
        });
    }

    if (currentQuestionIndex >= triviaQuestions.length) {
        return res.status(400).json({
            message: 'The quiz is already finished',
            score: `${score}/${triviaQuestions.length}`
        });
    }

    const currentQuestion = triviaQuestions[currentQuestionIndex];

    const isCorrect =
        userAnswer.trim().toLowerCase() ===
        currentQuestion.answer.trim().toLowerCase();

    if (isCorrect) {
        score++;
    }

    currentQuestionIndex++;

    // Si le quiz est terminé
    if (currentQuestionIndex >= triviaQuestions.length) {
        return res.status(200).json({
            feedback: isCorrect
                ? 'Correct answer!'
                : `Incorrect! The correct answer was ${currentQuestion.answer}`,
            message: 'Quiz finished!',
            score: `${score}/${triviaQuestions.length}`,
            scoreUrl: '/quiz/score'
        });
    }

    // Afficher la question suivante
    res.status(200).json({
        feedback: isCorrect
            ? 'Correct answer!'
            : `Incorrect! The correct answer was ${currentQuestion.answer}`,
        questionNumber: currentQuestionIndex + 1,
        nextQuestion: triviaQuestions[currentQuestionIndex].question
    });
});

// Afficher le score
router.get('/score', (req, res) => {
    res.status(200).json({
        message: 'Final score',
        score: score,
        totalQuestions: triviaQuestions.length
    });
});

module.exports = router;