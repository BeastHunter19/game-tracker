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
        const response = await fetch(url, {
            method: 'POST'
        })
        const data = await response.json()
        console.log(data)
        accessToken = data.access_token
        setTimeout(authenticate, data.expires_in - 3000)
    } catch (err) {
        logger.error(err, 'Could not get authentication token from IGDB')
    }
}

module.exports = { authenticate, query }
