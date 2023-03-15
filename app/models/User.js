const db = require('../utils/db')
const { logger } = require('../logger')

const User = {}

User.getAll = async () => {
    try {
        let users = await db.query(`SELECT * FROM users`)
        return users
    } catch (err) {
        logger.error(err, 'Could not retrieve users from database')
        throw err
    }
}
