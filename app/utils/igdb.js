const config = require('../config')
const { logger } = require('./logger')
const axios = require('axios')

let accessToken = ''

const query = axios.create({
    baseURL: 'https://api.igdb.com/v4',
    responseType: 'json',
    headers: {
        'Client-ID': config.igdb.clientID,
        'Content-Type': 'text/plain'
    }
})

query.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${accessToken}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

async function authenticate() {
    try {
        const url = new URL('https://id.twitch.tv/oauth2/token')
        url.searchParams.set('client_id', config.igdb.clientID)
        url.searchParams.set('client_secret', config.igdb.clientSecret)
        url.searchParams.set('grant_type', 'client_credentials')
        const response = await axios.post(url)
        accessToken = response.data.access_token
        // the timeout should be set at expires_in * 1000 - 3000, but it would
        // overflow the 32 bit maximum for setTimeout, so the token is refreshed
        // more often than needed
        setTimeout(authenticate, response.data.expires_in * 100 - 3000)
    } catch (err) {
        logger.error(err, 'Could not get authentication token from IGDB')
    }
}

module.exports = { authenticate, query }
