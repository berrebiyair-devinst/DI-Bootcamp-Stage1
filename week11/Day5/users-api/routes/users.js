const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const router = express.Router();
const filePath = path.join(__dirname, '../users.json');

router.post('/register', async (req, res) => {
    try {
        const { lastName, firstName, email, username, password } = req.body || {};

        const fields = [lastName, firstName, email, username, password];

        if (!fields.every(value =>
            typeof value === 'string' && value.trim() !== ''
        )) {
            return res.status(400).json({
                message: 'Tous les champs sont obligatoires'
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return res.status(400).json({
                message: 'Email invalide'
            });
        }

        const users = JSON.parse(await fs.readFile(filePath, 'utf8'));

        const exists = users.some(user =>
            user.username.toLowerCase() === username.trim().toLowerCase()
        );

        if (exists) {
            return res.status(409).json({
                message: "Ce nom d'utilisateur existe deja"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = {
            id: randomUUID(),
            lastName: lastName.trim(),
            firstName: firstName.trim(),
            email: email.trim(),
            username: username.trim(),
            password: hash
        };

        users.push(user);

        await fs.writeFile(
            filePath,
            JSON.stringify(users, null, 2),
            'utf8'
        );

        res.status(201).json({
            message: 'Inscription reussie',
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Impossible d'enregistrer l'utilisateur"
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body || {};

        if (
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username.trim() ||
            !password.trim()
        ) {
            return res.status(400).json({
                message: 'Nom utilisateur et mot de passe obligatoires'
            });
        }

        const users = JSON.parse(
            await fs.readFile(filePath, 'utf8')
        );

        const user = users.find(user =>
            user.username.toLowerCase() === username.trim().toLowerCase()
        );

        if (!user) {
            return res.status(401).json({
                message: 'Identifiants incorrects'
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({
                message: 'Identifiants incorrects'
            });
        }

        res.json({
            message: `Bienvenue ${user.firstName} !`,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Impossible de verifier la connexion'
        });
    }
});

function publicUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
}

router.get('/users', async (req, res) => {
    try {
        const users = JSON.parse(
            await fs.readFile(filePath, 'utf8')
        );

        res.json(users.map(publicUser));
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Impossible de lire les utilisateurs'
        });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const users = JSON.parse(
            await fs.readFile(filePath, 'utf8')
        );

        const user = users.find(user => user.id === req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        res.json(publicUser(user));
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Impossible de lire l'utilisateur"
        });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const changes = req.body;
        const allowed = [
            'lastName', 'firstName', 'email', 'username', 'password'
        ];

        if (
            !changes ||
            typeof changes !== 'object' ||
            Array.isArray(changes) ||
            Object.keys(changes).length === 0 ||
            Object.keys(changes).some(key => !allowed.includes(key))
        ) {
            return res.status(400).json({
                message: 'Fournis des champs utilisateur valides'
            });
        }

        for (const value of Object.values(changes)) {
            if (typeof value !== 'string' || !value.trim()) {
                return res.status(400).json({
                    message: 'Les champs doivent etre des textes non vides'
                });
            }
        }

        if (
            changes.email !== undefined &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(changes.email.trim())
        ) {
            return res.status(400).json({
                message: 'Email invalide'
            });
        }

        const users = JSON.parse(
            await fs.readFile(filePath, 'utf8')
        );

        const user = users.find(user => user.id === req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        if (changes.username !== undefined) {
            const exists = users.some(other =>
                other.id !== user.id &&
                other.username.toLowerCase() ===
                    changes.username.trim().toLowerCase()
            );

            if (exists) {
                return res.status(409).json({
                    message: "Ce nom d'utilisateur existe deja"
                });
            }
        }

        const updatedUser = { ...user };

        for (const [key, value] of Object.entries(changes)) {
            updatedUser[key] = key === 'password'
                ? await bcrypt.hash(value, 10)
                : value.trim();
        }

        const index = users.findIndex(user => user.id === req.params.id);
        users[index] = updatedUser;

        await fs.writeFile(
            filePath,
            JSON.stringify(users, null, 2),
            'utf8'
        );

        res.json({
            message: 'Utilisateur modifie',
            user: publicUser(updatedUser)
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Impossible de modifier l'utilisateur"
        });
    }
});

module.exports = router;