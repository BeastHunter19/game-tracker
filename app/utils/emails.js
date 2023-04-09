const nodemailer = require('nodemailer')
const config = require('../config')
const { logger } = require('./logger')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport(config.email)

module.exports.sendVerificationEmail = async (user) => {
    try {
        const token = await jwt.sign({ id: user.id }, config.secrets.verify, { expiresIn: '10m' })
        const verifyURL = `${config.frontendURL}/verify/email/?token=${token}`

        const info = await transporter.sendMail({
            from: {
                name: 'Game Tracker',
                address: config.email.auth.user
            },
            to: {
                name: user.name,
                address: user.email
            },
            subject: 'Verify email address',
            html: `<a href=${verifyURL}>Click here to verify your address</a>`
        })

        console.log('Preview message sent: %s', nodemailer.getTestMessageUrl(info))
    } catch (err) {
        logger.error(err, 'Could not send verification email to ' + user.email)
        throw err
    }
}

module.exports.sendPasswordResetEmail = async (user) => {
    try {
        const token = await jwt.sign({ id: user.id }, config.secrets.reset, { expiresIn: '10m' })
        const resetURL = `${config.frontendURL}/password/update/?token=${token}`

        const info = await transporter.sendMail({
            from: {
                name: 'Game Tracker',
                address: 'noreply@gametracker.com'
            },
            to: {
                name: user.name,
                address: user.email
            },
            subject: 'Reset password',
            html: `<a href=${resetURL}>Click here to reset your password</a>`
        })

        console.log('Preview message sent: %s', nodemailer.getTestMessageUrl(info))

        return token
    } catch (err) {
        logger.error(err, 'Could not send reset email to ' + user.email)
        throw err
    }
}

module.exports.sendPasswordUpdatedEmail = async (user) => {
    try {
        const info = await transporter.sendMail({
            from: {
                name: 'Game Tracker',
                address: 'noreply@gametracker.com'
            },
            to: {
                name: user.name,
                address: user.email
            },
            subject: 'Password updated',
            text: 'Your password has been updated successfully!'
        })

        console.log('Preview message sent: %s', nodemailer.getTestMessageUrl(info))
    } catch (err) {
        logger.error(err, 'Could not send reset email to ' + user.email)
        throw err
    }
}
