const { Router } = require('express')
const {
    getSearch,
    getPopular,
    getGameDetails,
    getCategories,
    getSingleCategory
} = require('../controllers/gamesController')

const router = Router()

router.get('/search', getSearch)

router.get('/popular', getPopular)

router.get('/games/:gameID', getGameDetails)

router.get('/categories', getCategories)

router.get('/categories/:id', getSingleCategory)

module.exports = router
