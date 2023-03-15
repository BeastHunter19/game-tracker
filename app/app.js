const express = require('express')
const config = require('./config')
const { logger } = require('./logger.js')
const pinoHTTP = require('pino-http')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const app = express()

app.use(pinoHTTP({ logger }))
app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json('Hello, world')
})

const server = app.listen(config.port, () => {
    logger.info('Server listening at http://localhost:' + config.port)
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
