const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

module.exports = {
    comments: async (req, res, next) => {
        const { board_number } = req.body;

        if (board_number == "") return errorMsg(res, "게시판 번호가 없습니다.");

        try {
            const [comment_data] = await pool.query(SQL.SELECT_allcomment, [board_number]);
            const [board_heart] = await pool.query(SQL.SELECT_boardheart, board_number);
            req.comment = comment_data;
            req.heart = board_heart.length;
            next();
        } catch (commentsERR) {
            errorMsg(res, commentsERR);
        }
    },

    comment_write: async (req, res, next) => {
        const { board_number, comment_box } = req.body;
        const { user_id } = req.user;

        if (comment_box == "") return errorMsg(res, "댓글을 작성해주세요.");

        try {
            await pool.query(SQL.INSERT_allcomment, [board_number, user_id, comment_box]);
            next();
        } catch (writeERR) {
            errorMsg(res, writeERR);
        }
    },

    comment_delete: async (req, res, next) => {
        try {
            await pool.query(SQL.DELETE_comment);
            next();
        } catch (deleteERR) {
            errorMsg(res, deleteERR);
        }
    },

    comment_update: async (req, res, next) => {},
};
