const Router = require('express')
const { body } = require('express-validator')
const User = require('../models/User')
const { postSignupUser } = require('../controllers/signupController')

const router = Router()

router.post(
    '/user',
    [
        body('name').trim().isString().escape(),
        body('email')
            .trim()
            .isString()
            .isEmail()
            .normalizeEmail()
            .withMessage('Invalid email address')
            .custom((val, { req }) => {
                return User.getByEmail(val).then((user) => {
                    if (user) {
                        return Promise.reject('Email already used')
                    }
                })
            }),
        body('password')
            .trim()
            .isString()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
        body('confirm_password').custom((val, { req }) => {
            if (val !== req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        })
    ],
    postSignupUser
)

module.exports = router
