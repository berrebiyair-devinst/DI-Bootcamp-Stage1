const express = require('express');
const postsRouter = require('./server/routes/posts');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('My API is good!');
});

app.use('/posts', postsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Route introuvable' });
});

app.use((error, req, res, next) => {
    console.error(error);

    const status = error.status === 400 ? 400 : 500;

    res.status(status).json({
        message: status === 400 ? 'Requete invalide' : 'Erreur serveur'
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});