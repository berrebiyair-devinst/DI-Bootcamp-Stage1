const postsModel = require('../models/posts');

async function getPosts(req, res) {
    try {
        const posts = await postsModel.getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
async function getPost(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'Identifiant invalide' });
        }

        const post = await postsModel.getPostById(id);

        if (!post) {
            return res.status(404).json({ message: 'Article introuvable' });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
async function addPost(req, res) {
    try {
        const { title, content } = req.body || {};

        if (
            typeof title !== 'string' ||
            typeof content !== 'string' ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: 'Le titre et le contenu sont obligatoires'
            });
        }

        const [post] = await postsModel.createPost(title, content);

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
async function editPost(req, res) {
    try {
        const id = Number(req.params.id);
        const { title, content } = req.body || {};

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Identifiant invalide'
            });
        }

        if (
            typeof title !== 'string' ||
            typeof content !== 'string' ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: 'Le titre et le contenu sont obligatoires'
            });
        }

        const [post] = await postsModel.updatePost(id, title, content);

        if (!post) {
            return res.status(404).json({
                message: 'Article introuvable'
            });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
async function removePost(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Identifiant invalide'
            });
        }

        const [post] = await postsModel.deletePost(id);

        if (!post) {
            return res.status(404).json({
                message: 'Article introuvable'
            });
        }

        res.json({
            message: 'Article supprime',
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
module.exports = { getPosts, getPost, addPost, editPost, removePost };