const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { logger } = require('../utils/logger')
const { sendVerificationEmail } = require('../utils/emails')
const config = require('../config')
const { email } = require('../config')

exports.postLogin = async (req, res, next) => {
    try {
        logger.info(req.user)
        // generate access and refresh tokens
        const accessToken = jwt.sign({ id: req.user.id }, config.secrets.access, {
            expiresIn: '10m'
        })
        const refreshToken = jwt.sign({ id: req.user.id }, config.secrets.access, {
            expiresIn: '7d'
        })

        // define expiration time for cookie
        const currentDate = new Date()
        const expirationDate = new Date(currentDate.setDate(currentDate.getDate() + 7))

        // filter user data removing confidential fields
        const user = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }

        res.cookie('refresh_cookie', refreshToken, {
            expires: expirationDate,
            httpOnly: true
        })
            .status(200)
            .json({
                accessToken: accessToken,
                expires_in: 600_000, //in milliseconds
                user: user
            })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}

exports.patchVerifyEmail = async (req, res, next) => {
    try {
        const decodedToken = await jwt.verify(req.body.token, config.secrets.verify)
        const userId = decodedToken.id
        const result = await User.verifyEmail(userId)
        if (!result) {
            throw new Error('Email verification failed')
        }
        res.status(200).json({
            message: 'Email successfully verified'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}

exports.postResendVerificationEmail = async (req, res, next) => {
    try {
        sendVerificationEmail(req.user)
        res.status(200).json({
            message: 'Verification email resent successfully'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}
