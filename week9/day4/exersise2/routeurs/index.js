const express = require('express');
const router = express.Router();

// Base de données temporaire
const todos = [];

let nextId = 1;

// Récupérer toutes les tâches
router.get('/', (req, res) => {
    res.json(todos);
});

// Ajouter une nouvelle tâche
router.post('/', (req, res) => {
    const newTodo = {
        id: nextId,
        title: req.body.title,
        completed: false
    };

    nextId++;

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// Modifier une tâche avec son ID
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: 'Todo not found'
        });
    }

    todo.title = req.body.title;
    todo.completed = req.body.completed;

    res.status(200).json(todo);
});

// Supprimer une tâche avec son ID
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Todo not found'
        });
    }

    const deletedTodo = todos.splice(index, 1);

    res.status(200).json({
        message: 'Todo deleted',
        todo: deletedTodo[0]
    });
});

module.exports = router;