const express = require('express');
const app = express();

// Importer le routeur
const todosRouter = require('./routes/todos');

// Permettre à Express de lire le JSON envoyé dans req.body
app.use(express.json());

// Monter le routeur avec le préfixe /api/todos
app.use('/api/todos', todosRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});