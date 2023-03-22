const config = require('../config')
const jwt = require('jsonwebtoken')

module.exports.generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id }, config.secrets.access, {
        expiresIn: '10m'
    })
    const refreshToken = jwt.sign({ id: user.id }, config.secrets.refresh, {
        expiresIn: '7d'
    })

    return {
        accessToken,
        refreshToken
    }
}

module.exports.getCookieExpiration = (days) => {
    const currentDate = new Date()
    const expirationDate = new Date(currentDate.setDate(currentDate.getDate() + days))
    return expirationDate
}
