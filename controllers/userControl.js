const bcrypt = require("bcrypt");

const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

module.exports = {
    login: async (req, res, next) => {
        const { user_id, password } = req.body;

        if (user_id == "" || password == "") {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }

        try {
            const id_pw_Data = await pool.query(SQL.SELECT_userid, user_id);

            if (id_pw_Data[0] == null) {
                return errorMsg(res, 400, "잘못된 id 또는 password입니다.");
            } else {
                if (await bcrypt.compareSync(password, id_pw_Data[0][0].password)) {
                    req.user = {
                        user_id: id_pw_Data[0][0].user_id,
                        email: id_pw_Data[0][0].email,
                        name: id_pw_Data[0][0].name,
                      };
                    next();
                } else return errorMsg(res, 400, "password가 맞지않음");
            }
        } catch (loginERR) {
            return errorMsg(res, 300, loginERR.message);
        }
    },

    signup: async (req, res, next) => {
        const { user_id, email, password, name, gender, age } = req.body;
        if (user_id == "" || email == "" || password == "" || name == "" || gender == "" || age == "") {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }

        try {
            const idData = await pool.query(SQL.SELECT_userid, user_id);
            const emailData = await pool.query(SQL.SELECT_email, email);

            if (!idData[0] || !emailData[0]) return errorMsg(res, 300, "존재하는 id 또는 email 입니다.");
            else {
                req.body.password = await bcrypt.hash(password, 10);
                await pool.query(SQL.INSERT_all, req.body);
            }
        } catch (signupERR) {
            return errorMsg(res, 300, signupERR.message);
        }
        next();
    },
};