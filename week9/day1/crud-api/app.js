const express = require("express");

const app = express();

const posts = require("./data.js");

app.use(express.json());


// ========================================
// CREATE - créer un post
// POST /api/posts
// ========================================

app.post("/api/posts", (req, res) => {

    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };

    posts.push(newPost);

    res.status(201).json(newPost);
});


// ========================================
// READ - récupérer tous les posts
// GET /api/posts
// ========================================

app.get("/api/posts", (req, res) => {

    res.json(posts);

});


// ========================================
// READ - récupérer un post
// GET /api/posts/:postID
// ========================================

app.get("/api/posts/:postID", (req, res) => {

    const id = Number(req.params.postID);

    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.status(200).json(post);
});


// ========================================
// UPDATE - modifier un post
// PUT /api/posts/:postID
// ========================================

app.put("/api/posts/:postID", (req, res) => {

    const id = Number(req.params.postID);

    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) {
        return res.status(404).send("Post not found");
    }

    const updatedPost = {
        id: posts[index].id,
        title: req.body.title,
        content: req.body.content,
    };

    posts[index] = updatedPost;

    res.status(200).json("Post updated");
});


// ========================================
// DELETE - supprimer un post
// DELETE /api/posts/:postID
// ========================================

app.delete("/api/posts/:postID", (req, res) => {

    const id = Number(req.params.postID);

    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) {
        return res.status(404).send("Post not found");
    }

    posts.splice(index, 1);

    res.status(200).json("Post deleted");
});


// ========================================
// Démarrage du serveur
// ========================================

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});