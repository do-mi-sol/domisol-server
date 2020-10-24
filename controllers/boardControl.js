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
            const [boardData] = await pool.query(SQL.SELECT_boardlimit, [skip, limit]);

            req.board = {
                boards: boardData,
                currentPage,
                numOfData: numOfData.count,
            };
            next();
        } catch (boardERR) {
            return errorMsg(res, boardERR.message);
        }
    },

    write: async (req, res, next) => {
        const { user_id } = req.user;
        const { board_title, board_box } = req.body;
        const board_filename = req.file.filename;
        if (board_title == "" || board_box == "" || board_filename == null) {
            return errorMsg(res, "채워지지 않은 정보가 있습니다.");
        }
        try {
            const file = "https://domisolserver.herokuapp.com/" + board_filename;
            await pool.query(SQL.INSERT_board, [user_id, board_title, board_box, file, 0]);
            next();
        } catch (writeERR) {
            return errorMsg(res, writeERR.message);
        }
    },

    boardView: async (req, res, next) => {
        try {
            const { board_number } = req.body;
            const [[view]] = await pool.query(SQL.SELECT_boardnumber, board_number);

            let views = view.board_views;
            views++;
            await pool.query(SQL.UPDATE_boardviews, [views, board_number]);
            req.view = views;

            next();
        } catch (boardDetailERR) {
            return errorMsg(res, boardDetailERR.message);
        }
    },

    boardHeart: async (req, res, next) => {
        const { board_number } = req.body;
        const { user_id } = req.user;

        try {
            const [data] = await pool.query(SQL.SELECT_boardheart, board_number);

            const heartData = data.filter((value) => {
                return value.user_id == user_id;
            });

            if (heartData.length != 0) return errorMsg(res, "이미 누른 하트입니다.");
            else {
                await pool.query(SQL.INSERT_boardheart, [board_number, user_id]);
                const [data] = await pool.query(SQL.SELECT_boardheart, board_number);
                req.heart = data.length;
                next();
            }
        } catch (boardLikeERR) {
            return errorMsg(res, boardLikeERR.message);
        }
    },

    best: async (req, res, next) => {
        try {
            const currentPage = req.body.currentPage;
            const limit = req.body.limit;
            const skip = (currentPage - 1) * limit;
            const [[numOfData]] = await pool.query(SQL.SELECT_countboard);
            const [boardData] = await pool.query(SQL.SELECT_bestboard, [skip, limit]);
            req.board = {
                boards: boardData,
                currentPage,
                numOfData: numOfData.count,
            };
            next();
        } catch (bestERR) {
            return errorMsg(res, bestERR.message);
        }
    },
};
