const { Router } = require('express')
const { body } = require('express-validator')
const passport = require('../utils/passport')
const isOwner = require('../middlewares/isOwner')
const {
    postLogin,
    patchVerifyEmail,
    postResendVerificationEmail
} = require('../controllers/authController')

const router = Router()

router.post('/login', passport.authenticate('local', { session: false }), postLogin)

router.patch('/verify/email', patchVerifyEmail)

router.post(
    '/verify/resend/:userId',
    passport.authenticate('jwt', { session: false }),
    isOwner,
    postResendVerificationEmail
)

module.exports = router
