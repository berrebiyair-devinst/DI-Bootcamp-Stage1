const db = require('../config/db');

function getAllPosts() {
    return db('posts').select('*');
}



function getPostById(id) {
    return db('posts').where('id', id).first();
}

function createPost(title, content) {
    return db('posts')
        .insert({ title, content })
        .returning('*');
}
function updatePost(id, title, content) {
    return db('posts')
        .where('id', id)
        .update({ title, content })
        .returning('*');
}
function deletePost(id) {
    return db('posts')
        .where('id', id)
        .del()
        .returning('*');
}
module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };