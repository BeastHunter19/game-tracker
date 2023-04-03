const Game = require('../models/Game')

exports.getSearch = async (req, res, next) => {
    try {
        const { query, limit, offset } = req.query
        const searchResults = await Game.search(query, limit, offset)
        res.status(200).json(searchResults)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}

exports.getPopular = async (req, res, next) => {
    try {
        const { limit, offset } = req.query
        const results = await Game.getPopular(limit, offset)
        res.status(200).json(results)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}
