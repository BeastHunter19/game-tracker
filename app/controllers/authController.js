const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { logger } = require('../utils/logger')
const { generateTokens, getCookieExpiration } = require('../utils/tokens')
const {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendPasswordUpdatedEmail
} = require('../utils/emails')
const config = require('../config')

exports.postLogin = async (req, res, next) => {
    try {
        logger.info(req.user)
        // generate access and refresh tokens
        const { accessToken, refreshToken } = generateTokens(req.user)

        // define expiration time for cookie
        const expirationDate = getCookieExpiration(7)

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
        await sendVerificationEmail(req.user)
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

exports.postPasswordReset = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed')
            error.statusCode = 422
            error.data = errors
            throw error
        }

        const email = req.body.email
        const user = await User.getByEmail(email)
        if (!user) {
            const error = new Error('User not found.')
            error.statusCode = 404
            throw error
        }

        const token = await sendPasswordResetEmail(user)
        await User.updateResetToken(email, token)

        res.status(200).json({
            message: 'Reset link sent successfully.'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}

exports.patchPasswordUpdate = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed')
            error.statusCode = 422
            error.data = errors
            throw error
        }

        const decodedToken = await jwt.verify(req.body.token, config.secrets.reset)
        const { id } = decodedToken
        const passwordUpdated = await User.updatePassword(id, req.body.token, req.body.password)
        if (!passwordUpdated) {
            throw new Error('Password update failed.')
        }

        const updatedUser = await User.getByID(id)

        await sendPasswordUpdatedEmail(updatedUser)

        res.status(200).json({
            message: 'Password successfully updated'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}

exports.postLogout = async (req, res, next) => {
    try {
        const loggedOut = await User.logout(req.user.id, req.cookies.refresh_cookie)
        if (!loggedOut) {
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: 'Logged out successfully'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}

exports.postRefreshTokens = async (req, res, next) => {
    try {
        const providedToken = req.cookies.refresh_cookie
        if (!providedToken) {
            res.status(401).json({ message: 'No refresh token was provided' })
        } else {
            const { id } = jwt.verify(providedToken, config.secrets.refresh)
            const existingUser = await User.getByID(id)
            if (!existingUser) {
                const error = new Error('User not found')
                error.statusCode = 404
                throw error
            }
            const isBlacklisted = await User.isTokenBlacklisted(id, providedToken)
            if (isBlacklisted) {
                const error = new Error('Unauthorized')
                error.statusCode = 401
                throw error
            }

            // generate access and refresh tokens
            const { accessToken, refreshToken } = generateTokens(existingUser)

            // define expiration time for cookie
            const expirationDate = getCookieExpiration(7)

            // filter user data removing confidential fields
            const user = {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
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
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}
