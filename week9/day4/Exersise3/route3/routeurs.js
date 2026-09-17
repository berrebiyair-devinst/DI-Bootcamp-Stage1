const express = require('express');
const router = express.Router();

// Base de données temporaire
const books = [];

let nextId = 1;

// Récupérer tous les livres
router.get('/', (req, res) => {
    res.status(200).json(books);
});

// Ajouter un nouveau livre
router.post('/', (req, res) => {
    const newBook = {
        id: nextId,
        title: req.body.title,
        author: req.body.author
    };

    nextId++;
    books.push(newBook);

    res.status(201).json(newBook);
});

// Modifier un livre avec son ID
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.status(200).json(book);
});

// Supprimer un livre avec son ID
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const deletedBook = books.splice(index, 1);

    res.status(200).json({
        message: 'Book deleted',
        book: deletedBook[0]
    });
});

module.exports = router;