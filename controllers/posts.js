const postsRouter = require('express').Router()
const Post = require('../models/posts')

postsRouter.get('/', async (req, res) => {
    let post = await Post.find({})
    res.json(post)
})

postsRouter.post('/', async (req, res) => {
    let post = new Post(req.body)
    const savedPost = await post.save()
    res.status(201).json(savedPost)
})

postsRouter.delete("/:id", async (req, res) => {
    await Post.findByIdAndRemove(req.params.id)
    res.status(204).end()
})
module.exports = postsRouter