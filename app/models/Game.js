const igdb = require('../utils/igdb')
const { logger } = require('../utils/logger')

const Game = {}

const summaryFields =
    'id,cover.image_id,first_release_date,involved_companies.*,involved_companies.company.name,name'

function formatGameSummary(gameInfo) {
    const releaseDate = gameInfo.first_release_date
        ? new Date(gameInfo.first_release_date * 1000).getFullYear()
        : null
    const coverImageURL = gameInfo.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover?.image_id}.jpg`
        : null
    const allDevelopers = gameInfo.involved_companies?.filter((value) => value.developer === true)
    console.log(allDevelopers)
    const developer = allDevelopers?.at(0) ? allDevelopers.at(0)?.company?.name : null
    return {
        id: gameInfo.id,
        title: gameInfo.name,
        developer: developer,
        release: releaseDate,
        image: coverImageURL
    }
}

Game.search = async (query) => {
    try {
        const response = await igdb.query.post(
            '/games',
            `search "${query}"; fields ${summaryFields};`
        )
        console.log(response.data)
        return response.data.map((value) => formatGameSummary(value))
    } catch (err) {
        logger.error(err, 'Could not make search through IGDB')
    }
}

module.exports = Game
