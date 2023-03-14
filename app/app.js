const express = require('express')
require('dotenv').config()
const { logger } = require('./logger.js')
const morgan = require('morgan')

const port = process.env.PORT
const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    logger.info('Server listening at http://localhost:' + port)
})
