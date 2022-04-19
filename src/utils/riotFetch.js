const fetch = require('cross-fetch')

const riotFetch = (url) => {
    return fetch(url, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY,
        },
    })
}

module.exports = riotFetch
