const { Router } = require('express')
const { getSearch } = require('../controllers/gamesController')

const router = Router()

router.get('/search', getSearch)

module.exports = router
