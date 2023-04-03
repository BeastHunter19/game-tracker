const { Router } = require('express')
const { getSearch, getPopular } = require('../controllers/gamesController')

const router = Router()

router.get('/search', getSearch)

router.get('/popular', getPopular)

module.exports = router
