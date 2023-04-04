const { Router } = require('express')
const {
    getSearch,
    getPopular,
    getGameDetails,
    getCategories
} = require('../controllers/gamesController')

const router = Router()

router.get('/search', getSearch)

router.get('/popular', getPopular)

router.get('/games/:gameID', getGameDetails)

router.get('/categories', getCategories)

module.exports = router
