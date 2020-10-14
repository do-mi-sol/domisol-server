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
        var token = req.headers.authorization;
        try {
            if (!token) {
                return errorMsg(res, 403, "토큰이 존재하지 않습니다.");
            } else {
                await jwt.verify(token, SECRETKEY, (error, decoded) => {
                    if (error) {
                        return errorMsh(res, 500, eror.message);
                    } else {
                        req.user = decoded.user;
                        next();
                    }
                });
            }
        } catch (verifyERR) {
            if (verifyERR.name === "TokenExpiredError") {
                return errorMsg(res, 419, "이미 만료된 토큰입니다.");
            }
            return errorMsg(res, 401, verifyERR.message); // 토큰이 일치하지 않을 떄
        }
    },
};
