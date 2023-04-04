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

exports.getGameDetails = async (req, res, next) => {
    try {
        const { gameID } = req.params
        const result = await Game.getDetails(gameID)
        res.status(200).json(result)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}

exports.getCategories = async (req, res, next) => {
    try {
        const { limit, offset, games } = req.query
        let result
        if (games) {
            results = await Game.getGenres(limit, offset, games)
        } else {
            results = await Game.getGenres(limit, offset)
        }
        res.status(200).json(results)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}
