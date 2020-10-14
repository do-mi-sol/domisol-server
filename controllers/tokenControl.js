require("dotenv").config();

const { errorMsg } = require("../utils/myMessage");

const jwt = require("jsonwebtoken");
const SECRETKEY = require("../config/jwt/jwt_config").jwt_secretkey;

module.exports = {
    signToken: async (req, res, next) => {
        try {
            req.token = await jwt.sign({ user: req.user }, SECRETKEY);
            next();
        } catch (signtokenERR) {
            return errorMsg(res, 400, signtokenERR.message);
        }
    },

    verifyToken: async (req, res, next) => {
        // 토큰은 클라이언트에서 req.headers로 전달.
        // var token = req.headers.authorization;
        // 테스트용 token
        var token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiJ0ZXN0MTEiLCJlbWFpbCI6InRlc3QxQHRlc3QxIiwibmFtZSI6InRlc3QxIiwiZ2VuZGVyIjoibWFsZSIsImFnZSI6IjIzIn0sImlhdCI6MTYwMjYxMzkxN30.wEJrHdGoUQziX3zG3rUKSz60vU93FrbUvlREGaX94Yw";
        try {
            if (!token) {
                return errorMsg(res, 403, "토큰이 존재하지 않습니다.");
            }
            req.decoded = await jwt.verify(token, SECRETKEY);
        } catch (verifyERR) {
            if (verifyERR.name === "TokenExpiredError") {
                return errorMsg(res, 419, "이미 만료된 토큰입니다.");
            }
            return errorMsg(res, 401, verifyERR.message); // 토큰이 일치하지 않을 떄
        }
        next();
    },
};
