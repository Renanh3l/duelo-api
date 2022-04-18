const getSummonerByName = require('./getSummonerByName')

const checkLeagueValidation = async (name, iconValidateId) => {
    try {
        const { profileIconId } = await getSummonerByName(name)

        return profileIconId === iconValidateId
    } catch (error) {
        return false
    }
}

module.exports = checkLeagueValidation
