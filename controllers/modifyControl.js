const bcrypt = require("bcrypt");

const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

require("dotenv").config();

module.exports = {
    idModify: async (req, res, next) => {
        const { user_id, password } = req.body;
        if (user_id == "" || password == "") {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }
        const user = req.decoded.user;
        const oldUserId = user.user_id;
        const newUserId = user_id;
        try {
            const [search_data] = await pool.query(SQL.SELECT_userid, oldUserId);
            if (search_data[0] == null) {
                return errorMsg(res, 300, "아이디 변경 실패. 입력하신 정보와 일치하는 계정이 존재하지 않습니다.");
            }
            if (oldUserId === newUserId) {
                return errorMsg(res, 202, "새로운 아이디와 기존 아이디가 동일합니다.");
            }
            if (await bcrypt.compareSync(password, search_data[0].password)) {
                const update_data = await pool.query(SQL.UPDATE_userid, [newUserId, oldUserId]);
                /**
                 * 아이디 변경에 성공하면 로그아웃 상태로 다시 로그인 페이지로 가서 토큰발급받도록.
                 */
                if (update_data[0].affectedRows === 0) return errorMsg(res, 202, "아이디 변경에 실패했습니다.");
            }
        } catch (idmodifyERR) {
            console.log(idmodifyERR);
            return errorMsg(res, 400, idmodifyERR.message);
        }
        next();
    },
    passwordModify: async (req, res, next) => {
        const { user_id, password, newPassword, newPasswordCheck } = req.body;
        if (user_id == "" || password == "") {
            return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
        }
        const user = req.decoded.user;
        const userId = user.user_id;
        const oldPassword = password;
        try {
            const [search_data] = await pool.query(SQL.SELECT_userid, userId);
            if (search_data[0] == null) {
                return errorMsg(res, 300, "비밀번호 변경 실패. 입력하신 정보와 일치하는 계정이 존재하지 않습니다.");
            }
            if (newPassword != newPasswordCheck) {
                return errorMsg(res, 202, "변경하려는 비밀번호가 서로 일치하지 않습니다.");
            }
            if (await bcrypt.compareSync(oldPassword, search_data[0].password)) {
                const hashPw = await bcrypt.hash(newPassword, 10);
                const update_data = await pool.query(SQL.UPDATE_userpassword, [hashPw, userId]);
                /**
                 * 비밀번호 변경에 성공하면 로그아웃 상태로 다시 로그인 페이지로 가서 토큰발급받도록.
                 */
                if (update_data[0].affectedRows === 0) return errorMsg(res, 202, "비밀번호 변경에 실패했습니다.");
            } else {
                return errorMsg(res, 400, "입력하신 비밀번호를 확인해주세요.");
            }
        } catch (passwordmodifyERR) {
            return errorMsg(res, 400, passwordmodifyERR.message);
        }
        next();
    },
};

/**
 * account modify 토큰사용해서 수정했음. 변경사항 봐서 뭐 바꿨는지 확인해보기.
 * 내일 오전에 확인
 */
