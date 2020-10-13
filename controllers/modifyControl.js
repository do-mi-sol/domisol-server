const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

require("dotenv").config();

module.exports = {
    idModify: async (req, res, next) => {
        var oldUserId = req.params.user_id;
        var newUserId = req.body.user_id;
        var password = req.body.password;
        try {
            const search_data = await pool.query(SQL.SELECT_userid_password, [oldUserId, password]);
            if (search_data[0].length === 0) {
                return errorMsg(res, 300, "아이디 변경 실패. 입력하신 정보와 일치하는 아이디가 존재하지 않습니다.");
            }
            if (oldUserId === newUserId) {
                return errorMsg(res, 202, "새로운 아이디와 기존 아이디가 동일합니다.");
            }

            // update sql = `UPDATE user SET user_id = ? WHERE user_id =? AND password = ?`
            const update_data = await pool.query(SQL.UPDATE_userid, [newUserId, oldUserId, password]);
            if (update_data[0].affectedRows === 0) {
                return errorMsg(res, 202, "아이디 변경에 실패했습니다.");
            }
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
