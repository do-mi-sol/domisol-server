const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

module.exports = {
    comments: async (req, res, next) => {
        try {
            const [comment_data] = await pool.query(SQL.SELECT_allcomment);
            req.comment = comment_data;
            next();
        } catch (commentsERR) {
            errorMsg(res, commentsERR);
        }
    },

    write: async (req, res, next) => {},

    delete: async (req, res, next) => {},
};
