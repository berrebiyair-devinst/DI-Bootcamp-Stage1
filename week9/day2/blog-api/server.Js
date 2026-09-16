const express = require("express");
const app = express();

app.use(express.json());

const data = [
    {
        id: 1,
        title: "Introduction to Express",
        content: "Express is a web application framework for Node.js.",
    },
    {
        id: 2,
        title: "Creating Routes in Express",
        content: "You can define routes using the express.Router() method.",
    },
    {
        id: 3,
        title: "Handling Requests and Responses",
        content: "Express provides methods to handle incoming requests and send responses.",
    }
];

// READ ALL
app.get("/posts", (req, res) => {
    res.json(data);
});

// READ ONE
app.get("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = data.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.json(post);
});

// CREATE
app.post("/posts", (req, res) => {
    const newPost = {
        id: data.length + 1,
        title: req.body.title,
        content: req.body.content
    };

    data.push(newPost);
    res.status(201).json(newPost);
});

// UPDATE
app.put("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = data.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).send("Post not found");
    }

    data[index].title = req.body.title;
    data[index].content = req.body.content;

    res.json(data[index]);
});

// DELETE
app.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = data.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).send("Post not found");
    }

    data.splice(index, 1);
    res.status(204).send();
});

// INVALID ROUTE
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// SERVER ERROR
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});