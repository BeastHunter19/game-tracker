const express = require('express')
require('dotenv').config()
const { logger } = require('./logger.js')
const morgan = require('morgan')
const helmet = require('helmet')

const port = process.env.PORT
const app = express()

app.use(helmet())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json('Hello, world')
})

app.listen(port, () => {
    logger.info('Server listening at http://localhost:' + port)
})
