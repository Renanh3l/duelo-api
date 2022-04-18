const getSummonerByName = require('./getSummonerByName')

const startLeagueValidation = async (summonerName) => {
    const tryIconIds = [7, 28]
    const { profileIconId } = await getSummonerByName(summonerName)

    const iconValidate = tryIconIds.find((icon) => icon !== profileIconId)

    return iconValidate
}

module.exports = startLeagueValidation
