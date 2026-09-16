const express = require("express");
const app = express();

app.use(express.json());

const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        published: 1925
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        published: 1960
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        published: 1949
    },
    
];

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

app.get("/api/books", (req, res) => {
    res.status(200).json(books);
});

app.get("/api/books/:bookid", (req, res) => {
    const id = Number(req.params.bookid);
    const book = books.find((b) => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
});

app.post("/api/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        published: req.body.published
    };
    books.push(newBook);
    res.status(201).json(newBook);
});