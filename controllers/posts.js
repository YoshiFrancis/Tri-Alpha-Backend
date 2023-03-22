const postsRouter = require('express').Router()
const Post = require('../models/posts')
const upload = require('../utils/upload')
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/'})

postsRouter.get('/', async (req, res) => {
    let post = await Post.find({})
    console.log(post)
    res.json(post)
})

postsRouter.post('/', async (req, res, next) => {
    let post = {
        topic: req.body.topic,
        username: req.body.username,
        info: req.body.info,
        image: null
    }
    post = new Post(post)
    const savedPost = await post.save()
    res.status(201).json(savedPost)
})

postsRouter.post('/create', upload.single('image'), async(req, res, next) => {
    console.log("Hello")
    console.log(req.body.id)
    const updatedPost = await Post.findByIdAndUpdate(req.body.id, { image : req.file.path })
    console.log(updatedPost)
    res.status(201).json(updatedPost)
})

postsRouter.delete("/:id", async (req, res) => {
    await Post.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

// deletes every post
postsRouter.delete("/", async (req, res) => {
    let posts = await Post.find({})
    // (await posts).forEach(post => Post.findByIdAndRemove(post._id.toString()))
    for (x of posts) {
        await Post.findByIdAndRemove(x._id.toString())
    }
    res.status(204).end()
})
module.exports = postsRouter