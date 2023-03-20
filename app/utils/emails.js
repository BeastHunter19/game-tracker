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
                address: 'gametracker-noreply@test.com'
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
