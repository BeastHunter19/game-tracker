const express = require('express')
require('dotenv').config()
const { logger } = require('./logger.js')
const pinoHTTP = require('pino-http')
const helmet = require('helmet')

const port = process.env.PORT
const app = express()

app.use(pinoHTTP({ logger }))
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json('Hello, world')
})

const server = app.listen(port, () => {
    logger.info('Server listening at http://localhost:' + port)
})

// handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.fatal(err, 'uncaught exception')
    server.close(() => {
        process.exit(1)
    })

    setTimeout(() => {
        process.abort()
    }, 1000).unref()
    process.exit(1)
})
