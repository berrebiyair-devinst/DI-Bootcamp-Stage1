const express = require("express");
const { fetchPosts } = require("./data/dataService");

const app = express();

app.get("/api/posts", async (req, res) => {
    const posts = await fetchPosts();

    res.json(posts);

    console.log("Posts fetched and sent successfully");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});