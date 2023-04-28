require('dotenv').config()

const config = {
    frontendURL: process.env.FRONTEND_URL,
    frontendURLtest: process.env.FRONTEND_TEST_URL,
    port: process.env.PORT || 3000,
    public: '../client/',
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectionLimit: 20
    },
    databaseName: process.env.DB_NAME,
    secrets: {
        access: process.env.ACCESS_JWT_SECRET,
        verify: process.env.VERIFY_JWT_SECRET,
        reset: process.env.RESET_JWT_SECRET,
        refresh: process.env.REFRESH_JWT_SECRET
    },
    email: {
        service: process.env.VERIFICATION_EMAIL_SERVICE,
        auth: {
            user: process.env.VERIFICATION_EMAIL_USER,
            pass: process.env.VERIFICATION_EMAIL_PASSWORD
        }
    },
    igdb: {
        clientID: process.env.IGDB_CLIENT_ID,
        clientSecret: process.env.IGDB_CLIENT_SECRET
    },
    tokenCleanupInterval: process.env.TOKEN_CLEANUP_INTERVAL || 3_600_000 // every hour
}

module.exports = config
