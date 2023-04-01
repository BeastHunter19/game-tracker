const Game = require('../models/Game')

exports.getSearch = async (req, res, next) => {
    try {
        const searchQuery = req.query.query
        const searchResults = await Game.search(searchQuery)
        res.status(200).json(searchResults)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
        return err
    }
}
