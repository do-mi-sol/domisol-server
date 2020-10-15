const pool = require("../config/database/db_connect");

const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

require("dotenv").config();

module.exports = {
    idFind: async (req, res, next) => {
        const { user_id } = req.body;
        try {
            const [search_data] = await pool.query(SQL.SELECT_name_email, [user.name, user.email]);
            if (search_data[0].length === 0) {
                return errorMsg(
                    res,
                    300,
                    "아이디 찾기 실패. 입력하신 정보와 일치하는 아이디가 존재하지 않습니다."
                );
            }
            res.locals.user_id = search_data[0].user_id;
        } catch (idfindERR) {
            return errorMsg(res, 400, idfindERR.message);
        }
        next();
    },

    passwordFind: async (req, res, next) => {
        user = req.body;
        try {
            const [search_data] = await pool.query(SQL.SELECT_name_email_userid, [
                user.name,
                user.email,
                user.user_id,
            ]);
            if (search_data.length === 0 || search_data[0] === undefined) {
                return errorMsg(
                    res,
                    300,
                    "아이디 찾기 실패. 입력하신 정보와 일치하는 아이디가 존재하지 않습니다."
                );
            }
            res.locals.password = search_data[0].password;
        } catch (passfindERR) {
            return errorMsg(res, 400, passfindERR.message);
        }
        next();
    },
};
