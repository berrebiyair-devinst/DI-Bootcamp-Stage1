const express = require('express');
const tasksRouter = require('./routes/tasks');
const app = express();

app.use(express.json());
app.use('/tasks', tasksRouter);

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
            ? 'Requete JSON invalide'
            : 'Erreur serveur'
    });
});

app.get('/', (req, res) => {
    res.send('Tasks API fonctionne !');
});

app.listen(3001, () => {
    console.log('Serveur lance sur http://localhost:3001');
});

// express.json() permet de lire les données JSON envoyées à l’API.
// On utilise le port 3001 pour éviter un conflit avec ton API de blog sur 3000.