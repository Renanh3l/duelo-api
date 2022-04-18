const fetch = require('cross-fetch')
const { apiBaseUrl } = require('../config/riot')

const getSummonerByName = async (summonerName) => {
    const response = await fetch(
        `${apiBaseUrl}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
            headers: {
                'X-Riot-Token': process.env.RIOT_API_KEY,
            },
        }
    )

    const data = await response.json()
    return data
}

module.exports = getSummonerByName
