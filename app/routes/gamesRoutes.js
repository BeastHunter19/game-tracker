const { Router } = require('express')
const passport = require('../utils/passport')
const isOwner = require('../middlewares/isOwner')
const {
    getSearch,
    getPopular,
    getGameDetails,
    getCategories,
    getSingleCategory,
    getGamesList,
    putGameList,
    deleteGameList,
    patchPlayed
} = require('../controllers/gamesController')

const router = Router()

router.get('/search', getSearch)

router.get('/popular', getPopular)

router.get('/games/:gameID', getGameDetails)

router.get('/categories', getCategories)

router.get('/categories/:id', getSingleCategory)

// this is made public to allow public profiles
router.get('/user/:userId/:listName', getGamesList)

router.put(
    '/user/:userId/:listName/:gameId',
    passport.authenticate('jwt', { session: false }),
    isOwner,
    putGameList
)

router.delete(
    '/user/:userId/:listName/:gameId',
    passport.authenticate('jwt', { session: false }),
    isOwner,
    deleteGameList
)

router.patch(
    '/user/:userId/:listName/:gameId',
    passport.authenticate('jwt', { session: false }),
    isOwner,
    patchPlayed
)

module.exports = router
