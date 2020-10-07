const express = require("express")

const conn = require("../config/database/db_connect")().init()
require("dotenv").config()

const jwt = require("jsonwebtoken")
const YOUR_SECRET_KEY = process.env.SECRET_KEY

module.exports = {
    // 생성된 오큰은 req.headers.authorization에 저장된다.
    signToken: async (req, res, next) => {
        console.log(req.body)
        const accessToken = await jwt.sign({ user_id: req.body.user_id }, YOUR_SECRET_KEY, { expiresIn: "10000" })
        res.status(200).json({ success: true, message: "아이디와 패스워드가 일치합니다.", token: accessToken })
        next()
    },

    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization
        try {
            if (!token) {
                return res.status(403).json({
                    success: false,
                    message: "토큰이 존재하지 않습니다.",
                })
            }
            req.decoded = await jwt.verify(req.headers.authorization, YOUR_SECRET_KEY)
            // 토큰에 담긴 정보를 req.decoded에 담아서 보냈다.
            return res.status(200).json({
                success: true,
                message: "유효성 확인이 완료된 토큰입니다",
                data: req.decoded,
            })
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(419).json({
                    success: false,
                    message: "만료된 트큰입니다.",
                })
            }
            return res.status(401).json({
                success: false,
                message: "일치하지 않는 토큰입니다.",
            })
        }
    },
}
