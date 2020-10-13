const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

require("dotenv").config();

module.exports = {
    idModify: async (req, res, next) => {
        const new_user_id = req.body.user_id
        const user_id = req.user.user_id

        if (new_user_id == "" ) {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }

        try {
            const search_data = await pool.query(SQL.SELECT_userid, new_user_id);

            if (search_data[0].length == 0) {
                await pool.query(SQL.UPDATE_userid, [new_user_id, user_id]);
                next()
            } else return errorMsg(res, 202, "새로운 아이디와 기존 아이디가 동일합니다.");

            // if (update_data[0].affectedRows == 0) {
            //     return errorMsg(res, 202, "아이디 변경에 실패했습니다.");
            // }
        } catch (idmodifyERR) {
            return errorMsg(res, 400, modifyERR.message);
        }
        next();
    },
    passwordModify: async (req, res, next) => {
        var userId = req.params.user_id;
        var oldPassword = req.body.password;
        var newPassword = req.body.new_password;
        try {
            const search_data = await pool.query(SQL.SELECT_userid_password, [userId, oldPassword]);
            if (search_data[0].length === 0) {
                return errorMsg(res, 300, "비밀번호 변경 실패. 입력하신 정보를 확인해주세요.");
            }
            if (oldPassword === newPassword) {
                return errorMsg(res, 202, "새로운 비밀번호와 기존 비밀번호가 동일합니다.");
            }
            const update_data = await pool.query(SQL.UPDATE_userpassword, [newPassword, userId, oldPassword]);
            if (update_data[0].affectedRows === 0) {
                return errorMsg(res, 202, "비밀번호 변경에 실패했습니다.");
            }
        } catch (passwordmodifyERR) {
            return errorMsg(res, 400, passwordmodifyERR.message);
        }
        next();
    },
};
