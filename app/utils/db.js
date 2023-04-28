const config = require('../config')
const mysql = require('mysql2/promise')

let pool

const createTables = async () => {
    const connection = await mysql.createConnection(config.db)
    await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${config.databaseName}\` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;`
    )

    pool = mysql.createPool({ ...config.db, database: config.databaseName })
    await pool.query(
        'CREATE TABLE IF NOT EXISTS `users` (\
            `id` binary(16) NOT NULL,\
            `name` varchar(255) NOT NULL,\
            `email` varchar(255) NOT NULL,\
            `password` varchar(255) NOT NULL,\
            `reset_password_token` varchar(255) DEFAULT NULL,\
            `email_verification_timestamp` timestamp NULL DEFAULT NULL,\
            PRIMARY KEY (`id`)\
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;'
    )
    await pool.query(
        "CREATE TABLE IF NOT EXISTS `played` (\
            `user` binary(16) NOT NULL,\
            `game` int NOT NULL,\
            `completed` tinyint NOT NULL DEFAULT '0',\
            PRIMARY KEY (`user`,`game`),\
            CONSTRAINT `fk_played_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
    )
    await pool.query(
        'CREATE TABLE IF NOT EXISTS `backlog` (\
            `user` binary(16) NOT NULL,\
            `game` int NOT NULL,\
            PRIMARY KEY (`user`,`game`),\
            CONSTRAINT `fk_backlog_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;'
    )
    await pool.query(
        'CREATE TABLE IF NOT EXISTS `watchlist` (\
            `user` binary(16) NOT NULL,\
            `game` int NOT NULL,\
            PRIMARY KEY (`user`,`game`),\
            CONSTRAINT `fk_watchlist_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;'
    )
    await pool.query(
        'CREATE TABLE IF NOT EXISTS `blacklisted_tokens` (\
            `token` varchar(255) NOT NULL,\
            `user` binary(16) NOT NULL,\
            PRIMARY KEY (`token`),\
            KEY `fk_user_idx` (`user`),\
            CONSTRAINT `fk_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;'
    )
}

async function query(sql, params) {
    const [results] = await pool.execute(sql, params)
    return results
}

module.exports = {
    query,
    createTables
}
