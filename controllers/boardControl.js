const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

module.exports = {
    board: async (req, res, next) => {
        try {
            const currentPage = req.body.currentPage;
            const limit = req.body.limit;

            const skip = (currentPage - 1) * limit;
            const [[numOfData]] = await pool.query(SQL.SELECT_countboard);
            const [boardData] = await pool.query(SQL.SELECT_boardlimit, [skip, skip, limit]);

            req.board = {
                boards: boardData,
                currentPage,
                numOfData: numOfData.count,
            };
            next();
        } catch (viewERR) {
            return errorMsg(res, viewERR.message);
        }
    },

    write: async (req, res, next) => {
        try {
            const { user_id, name, gender } = req.user;
            const { title, contents } = req.body;
            if (title == "" || contents == "" || req.file.filename == "") {
                return errorMsg(res, "채워지지 않은 정보가 있습니다.");
            }
            const file = "/upload/" + req.file.filename;
            const data = [user_id, title, contents, file, 0, 0];
            await pool.query(SQL.INSERT_board, data);
            next();
        } catch (writeERR) {
            return errorMsg(res, writeERR.message);
        }
    },

    boardDetail: async (req, res, next) => {
        try {
            const { board_number } = req.body;
            const [[detail]] = await pool.query(SQL.SELECT_boardnumber, board_number);
            let views = detail.board_views;
            views++;
            await pool.query(SQL.UPDATE_boardviews, [views, board_number]);
            req.detail = {
                detail,
            };
            next();
        } catch (boardDetailERR) {
            return errorMsg(res, boardDetailERR.message);
        }
    },

    like: async (req, res, next) => {
        try {
            const variable = req.body.variable;
            if (variable.board_number && !variable.comment_number) {
                const [[searchHeart]] = await pool.query(SQL.SELECT_boardheart, [
                    variable.board_number,
                    variable.userId,
                ]);
                if (searchHeart) {
                    await pool.query(SQL.DELETE_boardheart, [
                        variable.board_number,
                        variable.userId,
                    ]);
                    const [[heartCount]] = await pool.query(
                        SQL.SELECT_boardheartCount,
                        variable.board_number
                    );
                    req.heart = {
                        boardHeart: count.count,
                    };
                    next();
                } else {
                    await pool.query(SQL.INSERT_boardheart, [
                        variable.board_number,
                        variable.userId,
                    ]);
                    const [[heartCount]] = await pool.query(
                        SQL.SELECT_boardheartCount,
                        variable.board_number
                    );
                    req.heart = {
                        boardHeart: heartCount.count,
                    };
                    next();
                }
            } else {
                const [[searchHeart]] = await pool.query(SQL.SELECT_commentheart, [
                    variable.comment_number,
                    variable.board_number,
                    variable.userId,
                ]);
                if (searchHeart) {
                    await pool.query(SQL.DELETE_commentheart, [
                        variable.comment_number,
                        variable.board_number,
                        variable.userId,
                    ]);
                    const [[heartCount]] = await pool.query(SQL.SELECT_commentheartCount, [
                        variable.comment_number,
                        variable.board_number,
                    ]);
                    req.heart = {
                        commentHeart: heartCount.count,
                    };
                    next();
                } else {
                    await pool.query(SQL.INSERT_commentheart, [
                        variable.comment_number,
                        variable.board_number,
                        variable.userId,
                    ]);
                    const [[heartCount]] = await pool.query(SQL.SELECT_commentheartCount, [
                        variable.comment_number,
                        variable.board_number,
                    ]);
                    req.heart = {
                        commentHeart: heartCount.count,
                    };
                    next();
                }
            }
        } catch (likeERR) {
            return errorMsg(res, likeERR.message);
        }
    },
};
