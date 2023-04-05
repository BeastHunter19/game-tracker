const igdb = require('../utils/igdb')
const { logger } = require('../utils/logger')

const Game = {}

const summaryFields =
    'id,cover.image_id,first_release_date,involved_companies.*,involved_companies.company.name,name'

const detailedFields =
    summaryFields +
    ',summary,genres.name,platforms.name,websites.category,websites.url,total_rating,total_rating_count,screenshots.image_id,\
    similar_games.id,similar_games.cover.image_id,similar_games.first_release_date,similar_games.involved_companies.*,\
    similar_games.involved_companies.company.name,similar_games.name'

function getWebsiteType(category) {
    switch (category) {
        case 1:
            return 'Official'
        case 2:
            return 'Wikia'
        case 3:
            return 'Wikipedia'
        case 6:
            return 'Twitch'
        case 13:
            return 'Steam'
    }
}

function formatGameSummary(gameInfo) {
    const releaseDate = gameInfo.first_release_date
        ? new Date(gameInfo.first_release_date * 1000).getFullYear()
        : null
    const coverImageURL = gameInfo.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover?.image_id}.jpg`
        : null
    const allDevelopers = gameInfo.involved_companies?.filter((value) => value.developer === true)
    const developer = allDevelopers?.at(0) ? allDevelopers.at(0)?.company?.name : null
    return {
        id: gameInfo.id,
        title: gameInfo.name,
        developer: developer,
        release: releaseDate,
        image: coverImageURL
    }
}

function formatGameFullDetails(gameInfo) {
    const releaseDate = gameInfo.first_release_date
        ? new Date(gameInfo.first_release_date * 1000).toDateString()
        : null
    const coverImageURL = gameInfo.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${gameInfo.cover?.image_id}.jpg`
        : null
    const allDevelopers = gameInfo.involved_companies?.filter((value) => value.developer === true)
    const developer = allDevelopers?.at(0) ? allDevelopers.at(0)?.company?.name : null
    const allPublishers = gameInfo.involved_companies?.filter((value) => value.publisher === true)
    const publisher = allPublishers?.at(0) ? allPublishers.at(0)?.company?.name : null
    const screenshots = gameInfo.screenshots
        ? gameInfo.screenshots.map((screenshot) => {
              return `https://images.igdb.com/igdb/image/upload/t_1080p/${screenshot?.image_id}.jpg`
          })
        : []
    const genres = gameInfo.genres ?? []
    const platforms = gameInfo.platforms ? gameInfo.platforms.map((platform) => platform.name) : []
    // returns only official, wikia, steam, wikipedia and twitch links
    const websites = gameInfo.websites
        ? gameInfo.websites
              .filter((website) => [1, 2, 3, 6, 13].includes(website.category))
              .map((website) => {
                  return { type: getWebsiteType(website.category), url: website.url }
              })
        : []
    const similarGames = gameInfo.similar_games
        ? gameInfo.similar_games.map((game) => formatGameSummary(game))
        : []

    console.log(similarGames)

    return {
        id: gameInfo.id,
        title: gameInfo.name,
        developer: developer,
        publisher: publisher,
        release: releaseDate,
        description: gameInfo.summary,
        rating: gameInfo.total_rating,
        ratingCount: gameInfo.total_rating_count,
        images: [coverImageURL, ...screenshots],
        genres: genres,
        platforms: platforms,
        websites: websites,
        similarGames: similarGames
    }
}

Game.search = async (query, limit = 50, offset = 0) => {
    try {
        const response = await igdb.query.post(
            '/games',
            `search "${query}"; fields ${summaryFields}; limit ${limit}; offset ${offset};`
        )
        console.log(response.data)
        return response.data.map((value) => formatGameSummary(value))
    } catch (err) {
        logger.error(err, 'Could not make search through IGDB')
        throw err
    }
}

Game.getPopular = async (limit = 50, offset = 0) => {
    try {
        const response = await igdb.query.post(
            '/games',
            `fields ${summaryFields}; sort total_rating desc; 
            where total_rating != null & total_rating_count >= 100; 
            limit ${limit}; offset ${offset};`
        )
        console.log(response.data)
        return response.data.map((value) => formatGameSummary(value))
    } catch (err) {
        logger.error(err, `Could not retrieve popular games at offset ${offset}`)
        throw err
    }
}

Game.getDetails = async (id) => {
    try {
        const response = await igdb.query.post(
            '/games',
            `fields ${detailedFields}; where id = ${id};`
        )
        console.log(response.data)
        return formatGameFullDetails(response.data[0])
    } catch (err) {
        logger.error(err, `Could not fetch game details for game with id ${id}`)
        throw err
    }
}

Game.getGenres = async (limit = 500, offset = 0, gamesPerCategory = 10) => {
    try {
        const genresResponse = await igdb.query.post(
            '/genres',
            `fields id,name; limit ${limit}; offset ${offset};`
        )
        const allGenres = genresResponse.data

        let pendingQueries = 0
        let builtMultiQuery = ''
        let result = []
        let response
        for (const genre of allGenres) {
            builtMultiQuery = builtMultiQuery.concat(
                `query games \"${genre.id}\" {
                fields ${summaryFields};
                sort total_rating desc;
                where genres = [${genre.id}] & total_rating != null & total_rating_count >= 50;
                limit ${gamesPerCategory};
                };\n`
            )
            if (++pendingQueries === 10) {
                pendingQueries = 0
                response = await igdb.query.post('/multiquery', builtMultiQuery)
                builtMultiQuery = ''
                result = result.concat(response.data)
            }
        }
        if (pendingQueries) {
            response = await igdb.query.post('/multiquery', builtMultiQuery)
            result = result.concat(response.data)
        }
        result = result.map((value) => {
            const index = allGenres.findIndex((genre) => genre.id == value.name)
            return {
                id: value.name,
                name: index > -1 ? allGenres[index].name : '',
                games: value.result.map((gameInfo) => formatGameSummary(gameInfo))
            }
        })
        return result
    } catch (err) {
        logger.error(err, 'Could not get game genres')
        throw err
    }
}

Game.getGamesByGenre = async (id, limit = 50, offset = 0) => {
    try {
        const response = await igdb.query.post(
            '/games',
            `fields ${summaryFields}; sort total_rating desc; 
            where genres = [${id}] & total_rating != null & total_rating_count >= 50; 
            limit ${limit}; offset ${offset};`
        )
        console.log(response.data)
        return response.data.map((value) => formatGameSummary(value))
    } catch (err) {
        logger.error(err, `Could not retrieve popular games at offset ${offset}`)
        throw err
    }
}

module.exports = Game
