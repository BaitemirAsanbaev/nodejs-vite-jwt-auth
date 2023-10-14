const jwt = require("jsonwebtoken")
const tokenModel = require("../models/token")
class TokenService{
    generateToken(payload){
        const access = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: '4h'})
        const refresh = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '30d'})
        return{
            access,
            refresh
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return await tokenModel.create({user: userId, refreshToken})
    }
    async removeToken(refreshToken){
        const tokenData  = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }

    async validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY)
            return userData
        }
        catch (e) {
            return null
        }
    }
    async validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.REFRESH_SECRET_KEY)
            return userData
        }
        catch (e) {
            return null
        }
    }
    async findToken(token){
        const tokenData = await tokenModel.findOne({refreshToken: token})
        return tokenData
    }
}

module.exports = new TokenService()