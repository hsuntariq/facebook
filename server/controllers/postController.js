const Post = require('../models/postModel');
const AsyncHandler = require('express-async-handler');
const createPosts = AsyncHandler(async (req, res) => {
    const { user, caption, image } = req.body
    try {
        const createdPost = await Post.create({
            caption, image, user
        })
        res.send(createdPost)
    } catch (error) {
        throw new Error(error)
    }


})


const getPosts = AsyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.send(posts)
})

module.exports = {
    createPosts,
    getPosts
}