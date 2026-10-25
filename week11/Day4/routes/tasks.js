const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, '../tasks.json');

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const tasks = JSON.parse(data);

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Impossible de lire les taches'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title } = req.body || {};

        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({
                message: 'Le titre est obligatoire'
            });
        }

        const data = await fs.readFile(filePath, 'utf8');
        const tasks = JSON.parse(data);

        const newTask = {
            id: tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1,
            title: title.trim(),
            completed: false
        };

        tasks.push(newTask);

        await fs.writeFile(
            filePath,
            JSON.stringify(tasks, null, 2),
            'utf8'
        );

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Impossible de sauvegarder la tache'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Identifiant invalide'
            });
        }

        const data = await fs.readFile(filePath, 'utf8');
        const tasks = JSON.parse(data);

        const task = tasks.find(task => task.id === id);

        if (!task) {
            return res.status(404).json({
                message: 'Tache introuvable'
            });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Impossible de lire la tache'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, completed } = req.body || {};

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Identifiant invalide'
            });
        }

        if (
            typeof title !== 'string' ||
            !title.trim() ||
            typeof completed !== 'boolean'
        ) {
            return res.status(400).json({
                message: 'Fournis un titre et completed en true ou false'
            });
        }

        const data = await fs.readFile(filePath, 'utf8');
        const tasks = JSON.parse(data);

        const task = tasks.find(task => task.id === id);

        if (!task) {
            return res.status(404).json({
                message: 'Tache introuvable'
            });
        }

        task.title = title.trim();
        task.completed = completed;

        await fs.writeFile(
            filePath,
            JSON.stringify(tasks, null, 2),
            'utf8'
        );

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Impossible de modifier la tache'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Identifiant invalide'
            });
        }

        const data = await fs.readFile(filePath, 'utf8');
        const tasks = JSON.parse(data);

        const index = tasks.findIndex(task => task.id === id);

        if (index === -1) {
            return res.status(404).json({
                message: 'Tache introuvable'
            });
        }

        const [deletedTask] = tasks.splice(index, 1);

        await fs.writeFile(
            filePath,
            JSON.stringify(tasks, null, 2),
            'utf8'
        );

        res.json({
            message: 'Tache supprimee',
            task: deletedTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Impossible de supprimer la tache'
        });
    }
});

module.exports = router;