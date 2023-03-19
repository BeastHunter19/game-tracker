const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')
require('dotenv').config()

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (username, password, cb) {
            return User.getByEmail(username)
                .then((existingUser) => {
                    if (!existingUser) {
                        return cb(null, false, { message: 'Incorrect email' })
                    }
                    return bcrypt.compare(password, existingUser.password).then((result) => {
                        if (!result) {
                            return cb(null, false, { message: 'Incorrect password' })
                        }
                        return cb(null, user)
                    })
                })
                .catch((err) => {
                    return cb(err)
                })
        }
    )
)

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_JWT_SECRET
        },
        function (jwt_payload, cb) {
            return User.getByID(jwt_payload.id)
                .then((existingUser) => {
                    return cb(null, existingUser || false)
                })
                .catch((err) => {
                    return cb(err, false)
                })
        }
    )
)

module.exports = passport
