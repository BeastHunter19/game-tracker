const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.postLogin = async (req, res, next) => {
    try {
        // generate access and refresh tokens
        const accessToken = jwt.sign({ id: req.user.id }, process.env.ACCESS_JWT_SECRET, {
            expiresIn: '10m'
        })
        const refreshToken = jwt.sign({ id: req.user.id }, process.env.ACCESS_JWT_SECRET, {
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
                expires_in: 600_000 //in milliseconds
            })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}
