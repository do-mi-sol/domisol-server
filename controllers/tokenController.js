const express = require("express");

require("dotenv").config();

const { errorMsg } = require("../utils/myMessage");

const jwt = require("jsonwebtoken");

const YOUR_SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    // 생성된 오큰은 req.headers.authorization에 저장된다.
    signToken: async (req, res, next) => {
        try {
            const accessToken = await jwt.sign({ user_id: req.body.user_id }, YOUR_SECRET_KEY, { expiresIn: "30000" });
            res.locals.token = accessToken;
        } catch (signtokenERR) {
            return errorMsg(res, 400, signtokenERR.message);
        }
        next();
    },

    verifyToken: async (req, res, next) => {
        req.headers.authorization =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZG9taXNvbCIsImlhdCI6MTYwMjUwMTQyOCwiZXhwIjoxNjAyNTAxNDU4fQ.3D8U12fwfY_v4-I7u6OKjwNRXPkU-C0g1lZlKKtCBDE";
        var token = req.headers.authorization;
        console.log(token);
        try {
            if (!token) {
                return errorMsg(res, 403, "토큰이 존재하지 않습니다.");
            }
            // 토큰에 담긴 정보를 req.decoded에 담아서 보냈다.
            req.decoded = await jwt.verify(req.headers.authorization, YOUR_SECRET_KEY);
            console.log(req.decoded);
        } catch (verifyERR) {
            if (verifyERR.name === "TokenExpiredError") {
                return errorMsg(res, 419, "이미 만료된 토큰입니다.");
            }
            return errorMsg(res, 401, verifyERR.message); // 토큰이 일치하지 않을 떄
        }
        next();
    },
};
