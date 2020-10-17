require("dotenv").config();

const { errorMsg } = require("../utils/myMessage");

const jwt = require("jsonwebtoken");
const SECRETKEY = require("../config/jwt/jwt_config").jwt_secretkey;

module.exports = {
    signToken: async (req, res, next) => {
        try {
            req.token = jwt.sign({ user: req.user }, SECRETKEY);
            next();
        } catch (signtokenERR) {
            return errorMsg(res, signtokenERR.message);
        }
    },

    verifyToken: async (req, res, next) => {
<<<<<<< HEAD
        var token = req.headers.authorization;
        try {
            if (!token) {
                return errorMsg(res, 403, "토큰이 존재하지 않습니다.");
            } else {
                await jwt.verify(token, SECRETKEY, (error, data) => {
                    if (error) {
                        return errorMsh(res, 500, eror.message);
                    } else {
                        req.user = data.user;
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
=======
        const token = req.headers.authorization.split("Bearer ")[1];

        jwt.verify(token, SECRETKEY, (err, data) => {
            if (err) return errorMsg(res, "토큰이 유효하지 않습니다.");
            else {
                req.user = data.user;
                next();
            }
        });
>>>>>>> 2ae9360cce63976c02bd43c96c080d54c2c009e2
    },
};
