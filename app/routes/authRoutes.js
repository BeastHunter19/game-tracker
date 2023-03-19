const { Router } = require('express')
const { body } = require('express-validator')
const passport = require('../utils/passport')
const isOwner = require('../middlewares/isOwner')
const { postLogin } = require('../controllers/authController')

const router = Router()

router.post('/login', passport.authenticate('local', { session: false }), postLogin)

module.exports = router
