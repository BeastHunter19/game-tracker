const { validationResult } = require('express-validator')
const User = require('../models/User')

exports.postSignupUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed')
            error.statusCode = 422
            error.data = errors
            throw error
        }
        const newUser = await User.create(body.name, body.email, body.password)

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        })
    } catch (err) {
        next(err)
    }
}
