const bcrypt = require("bcrypt");

const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

require("dotenv").config();

module.exports = {
    idModify: async (req, res, next) => {
        const { new_user_id, password } = req.body;
        if (new_user_id == "" || password == "") {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }
        const oldUserId = req.user.user_id;
        try {
            if (oldUserId === new_user_id) {
                return errorMsg(res, 202, "새로운 아이디와 기존 아이디가 동일합니다.");
            }
            const [search_data] = await pool.query(SQL.SELECT_userid, oldUserId);
            if (await bcrypt.compareSync(password, search_data[0].password)) {
                await pool.query(SQL.UPDATE_userid, [new_user_id, oldUserId]);
                next();
            } else {
                return errorMsg(res, 202, "패스워드가 일치하지 않습니다.");
            }
        } catch (idmodifyERR) {
            return errorMsg(res, 400, idmodifyERR.message);
        }
    },
    passwordModify: async (req, res, next) => {
        const { password, newPwd, newPwdCheck } = req.body;
        if (password == "" || newPwd == "" || newPwdCheck == "") {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }
        const user_id = req.user.user_id;
        try {
            if (newPwd != newPwdCheck) {
                return errorMsg(res, 202, "변경하려는 비밀번호가 서로 일치하지 않습니다.");
            } else {
                const [search_data] = await pool.query(SQL.SELECT_userid, user_id);
                if (await bcrypt.compareSync(password, search_data[0].password)) {
                    const hashPw = await bcrypt.hash(newPwd, 10);
                    await pool.query(SQL.UPDATE_userpassword, [hashPw, user_id]);
                    next();
                } else {
                    return errorMsg(res, 400, "입력하신 비밀번호를 확인해주세요.");
                }
            }
        } catch (passwordmodifyERR) {
            return errorMsg(res, 400, passwordmodifyERR.message);
        }
    },
};
