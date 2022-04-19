const riotFetch = require('../utils/riotFetch')
const { apiBaseUrl } = require('../config/riot')

const getSummonerByName = async (summonerName) => {
    const response = await riotFetch(
        `${apiBaseUrl}/lol/summoner/v4/summoners/by-name/${summonerName}`
    )

    return await response.json()
}

module.exports = getSummonerByName
