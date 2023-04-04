const { Router } = require('express')
const { getSearch, getPopular, getGameDetails } = require('../controllers/gamesController')

const router = Router()

router.get('/search', getSearch)

router.get('/popular', getPopular)

router.get('/games/:gameID', getGameDetails)

module.exports = router
