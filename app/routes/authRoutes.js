const { Router } = require('express')
const { body } = require('express-validator')
const passport = require('../utils/passport')
const isOwner = require('../middlewares/isOwner')
const {
    postLogin,
    patchVerifyEmail,
    postResendVerificationEmail,
    postPasswordReset,
    patchPasswordUpdate,
    postLogout,
    postRefreshTokens,
    getUserPublic
} = require('../controllers/authController')

const router = Router()

router.post(
    '/login',
    [
        body('email').trim().isString().isEmail().withMessage('Please enter a valid email.'),
        body('password')
            .trim()
            .isString()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
    ],
    passport.authenticate('local', { session: false }),
    postLogin
)

router.patch('/verify/email', patchVerifyEmail)

router.post(
    '/verify/resend/:userId',
    passport.authenticate('jwt', { session: false }),
    isOwner,
    postResendVerificationEmail
)

router.post(
    '/password/reset',
    [body('email').trim().isString().isEmail().withMessage('Please enter a valid email.')],
    postPasswordReset
)

router.patch(
    '/password/update',
    [
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
        }),
        body('token').trim().isString()
    ],
    patchPasswordUpdate
)

router.post(
    '/logout/:userId',
    passport.authenticate('jwt', { session: false }),
    isOwner,
    postLogout
)

router.post('/tokens/refresh', postRefreshTokens)

router.get('/public/:userID', getUserPublic)

module.exports = router
