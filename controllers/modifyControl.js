const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");
const bcrypt = require("bcrypt");

const { errorMsg } = require("../utils/myMessage");

module.exports = {
    idModify: async (req, res, next) => {
        const { new_user_id, password } = req.body;
        const user_id = req.user.user_id;

        if (new_user_id == "" || password == "") {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }
        try {
            const [newid_data] = await pool.query(SQL.SELECT_userid, new_user_id);
            const [id_data] = await pool.query(SQL.SELECT_userid, user_id);

            if (newid_data.length != 0) {
                return errorMsg(res, 202, "존재하는 아이디 입니다.");
            } else {
                if (await bcrypt.compareSync(password, id_data[0].password)) {
                    await pool.query(SQL.UPDATE_userid, [new_user_id, user_id]);
                    next();
                } else return errorMsg(res, 202, "비밀번호가 틀립니다.");
            }
        } catch (idModifyERR) {
            return errorMsg(res, 400, idModifyERR.message);
        }
    },

    passwordModify: async (req, res, next) => {
        const { new_password, password } = req.body;
        const user_id = req.user.user_id;

        if (new_password == "" || password == "") {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }
        try {
            const [id_data] = await pool.query(SQL.SELECT_userid, user_id);

            if (await bcrypt.compareSync(password, id_data[0].password)) {
                hash_pw = await bcrypt.hash(new_password, 10);
                await pool.query(SQL.UPDATE_password, [hash_pw, user_id]);
                next();
            } else return errorMsg(res, 202, "비밀번호가 틀립니다.");
        } catch (passwordModifyERR) {
            return errorMsg(res, 400, passwordModifyERR.message);
        }
    },
};
