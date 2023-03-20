require('dotenv').config()

const config = {
    frontendURL: process.env.FRONTEND_URL || 'http://localhost:5173',
    port: process.env.PORT || 3000,
    public: '../client/',
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    secrets: {
        access: process.env.ACCESS_JWT_SECRET,
        verify: process.env.VERIFY_JWT_SECRET,
        reset: process.env.RESET_JWT_SECRET
    },
    email: {
        host: process.env.VERIFICATION_EMAIL_HOST,
        port: process.env.VERIFICATION_EMAIL_PORT,
        secure: process.env.VERIFICATION_EMAIL_PORT == 465,
        auth: {
            user: process.env.VERIFICATION_EMAIL_USER,
            pass: process.env.VERIFICATION_EMAIL_PASSWORD
        }
    }
}

module.exports = config
