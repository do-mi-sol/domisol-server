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
            return errorMsg(res, 400, signtokenERR.message);
        }
    },

    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization.split("Bearer ")[1];

        jwt.verify(token, SECRETKEY, (err, data) => {
            if (err) return errorMsg(res, 403, "토큰이 유효하지 않습니다.");
            else {
                req.user = data.user;
                next();
            }
        });
    },
};
