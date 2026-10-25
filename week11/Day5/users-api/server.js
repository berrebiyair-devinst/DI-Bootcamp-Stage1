const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');
const app = express();

app.use(express.json());
app.use('/', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.status(404).json({
        message: 'Route introuvable'
    });
});

app.use((error, req, res, next) => {
    console.error(error);

    const status = error.status === 400 ? 400 : 500;

    res.status(status).json({
        message: status === 400
            ? 'JSON invalide'
            : 'Erreur serveur'
    });
});

app.listen(3002, () => {
    console.log('Serveur lance sur http://localhost:3002');
});