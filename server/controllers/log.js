const jwt = require('jsonwebtoken')
const { user } = require('../models')
const { character } = require('../models')
const {makeAccessToken, makeRefreshToken } = require("../middleware/token")

module.exports = {
    login: async (req, res) => {
        try {
            const userInfo  = await user.findOne({
                where: { email: req.body.email,
                password : req.body.password
            }})
            const accessToken = await makeAccessToken(userInfo.dataValues.email)
            const refreshToken = await makeRefreshToken(userInfo.dataValues.email)
           
            await character.findOne({
                where : { user_id : userInfo.dataValues.id}
            })
            .then(character => {
                const characterInfo = {...character.dataValues, 
                    level : character.dataValues.totalExp / 100,
                    exp : character.dataValues.totalExp % 100
                }
                res.status(200).cookie('accessToken', accessToken)
                .json({characterInfo : characterInfo, 
                    userInfo : userInfo,
                    accessToken : accessToken,
                    refreshToken : refreshToken
                    })
            })
        }
        catch (err) {
            res.status(404).json({message : "Wrong user Id"})
        }
    },

    logout : async (req, res) => {
        res.clearCookie('accessToken');
        res.status(200).json({message : '로그아웃되었습니다.'})
    },
}