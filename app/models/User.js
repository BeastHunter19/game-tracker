const db = require('../utils/db')
const { logger } = require('../logger')
const bcrypt = require('bcryptjs')

const User = {}

User.getAll = async () => {
    try {
        let users = await db.query(`SELECT * FROM users`)
        return users
    } catch (err) {
        logger.error(err, 'Could not retrieve users from database')
        return err
    }
}

User.create = async (name, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await db.query(
            `INSERT INTO users(id, name, email, password) VALUES(UUID_TO_BIN(UUID()), ?, ?, ?)`,
            [name, email, hashedPassword]
        )
        return newUser
    } catch (err) {
        logger.error(err, 'Could not add new user to database')
        return err
    }
}

User.getByEmail = async (email) => {
    try {
        const user = await db.query(`SELECT * FROM users WHERE email = ?`, email)
        return user
    } catch (err) {
        logger.error(err, 'Could not add new user to database')
        return err
    }
}

module.exports = User
