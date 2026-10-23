const express = require('express');
const {
    getPosts,
    getPost,
    addPost,
    editPost,
    removePost
} = require('../controllers/posts');
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', removePost);

module.exports = router;