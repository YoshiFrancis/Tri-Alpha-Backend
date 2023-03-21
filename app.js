const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const postsRouter = require('./controllers/posts')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')



console.log("Attempting to connect to MongoDB")
try {
    mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB')
} catch(error) {
    logger.error("Was not able to connect to MongoDB")
}

app.use(middleware.errorHandler)
app.use(cors())
app.use(express.json())
app.use('/api/posts', postsRouter)

app.use(middleware.unknownEndpoint)



module.exports = app