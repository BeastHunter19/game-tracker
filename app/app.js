const express = require('express')
const config = require('./config')
const { logger } = require('./utils/logger.js')
const pinoHTTP = require('pino-http')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const User = require('./models/User')

const igdb = require('./utils/igdb')

const signupRoutes = require('./routes/signupRoutes')
const authRoutes = require('./routes/authRoutes')
const gamesRoutes = require('./routes/gamesRoutes')

const app = express()

app.use(
    cors({
        origin: config.frontendURL,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'Origin',
            'ngrok-skip-browser-warning'
        ],
        credentials: true,
        maxAge: 600
    })
)

app.use(pinoHTTP({ logger }))
app.use(helmet())
// this helps reducing fingerprinting
app.disable('x-powered-by')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/signup', signupRoutes)
app.use('/auth', authRoutes)
app.use('/api', gamesRoutes)

// error handler middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    res.status(status).json({
        message: error.message,
        data: error.data
    })
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

// authenticate with IGDB api and start refresh timer
igdb.authenticate()

// start blacklisted token cleanup timer
User.removeExpiredTokensFromBlacklist()
setInterval(User.removeExpiredTokensFromBlacklist, config.tokenCleanupInterval)
