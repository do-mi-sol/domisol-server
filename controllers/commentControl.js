const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

module.exports = {
    comments: async (req, res, next) => {
        const { board_number } = req.body;

        try {
            const [comment_data] = await pool.query(SQL.SELECT_allcomment, [board_number]);

            req.comment = comment_data;
            next();
        } catch (commentsERR) {
            errorMsg(res, commentsERR);
        }
    },

    comment_write: async (req, res, next) => {
        const { comment_box, comment_date } = req.body;
        const { user_id } = req.user;

        if (comment_box == "") return errorMsg(res, "댓글을 작성해주세요.");

        try {
            await pool.query(SQL.INSERT_allcomment, [user_id, comment_box, comment_date]);
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
