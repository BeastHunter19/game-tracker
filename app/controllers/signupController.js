const { validationResult } = require('express-validator')
const User = require('../models/User')
const { logger } = require('../utils/logger')
const { sendVerificationEmail } = require('../utils/emails')

exports.postSignupUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed')
            error.statusCode = 422
            error.data = errors
            throw error
        }

        const body = req.body
        const existingUser = await User.getByEmail(body.email)
        if (existingUser) {
            res.status(200).send('Email already taken')
        } else {
            const newUser = await User.create(body.name, body.email, body.password)

            sendVerificationEmail(newUser)

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    name: newUser.name,
                    email: newUser.email
                }
            })
        }
    } catch (err) {
        logger.error(err, 'Could not handle post request to user')
        next(err)
    }
}
