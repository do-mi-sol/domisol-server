const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");
const multer = require("multer");
const fs = require("fs");
const { errorMsg } = require("../utils/myMessage");
const { search } = require("../routes/user");

module.exports = {
    view: async (req, res, next) => {
        try {
            // 현재 페이지 받아옴
            const currentPage = Math.max(1, parseInt(req.body.currentPage));
            // 페이지에 보여줄 게시글의 수
            const limit = Math.max(1, parseInt(req.body.limit));
            // 건너뛸 데이터, 2페이지 클릭 시 limit만큼의 개시글을 제외하고 다음 5개의 글만 보여주도록 한다.
            const skip = (currentPage - 1) * limit;
            // 전체 데이터의 개수
            const [[numOfData]] = await pool.query(SQL.SELECT_countboard);
            // 전체 페이지 수
            const maxPage = Math.ceil(numOfData.count / limit);
            const [boardData] = await pool.query(SQL.SELECT_boardlimit, [skip, skip, limit]);
            let searchData = [];
            for (var i = 0; i < boardData[1].length; i++) {
                searchData.push(boardData[1][i]);
            }
            req.board = {
                boards: searchData,
                currentPage,
                numOfData: numOfData.count,
                maxPage,
                limit,
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
                    await pool.query(SQL.DELETE_boardheart, [variable.board_number, variable.userId]);
                    const [[heartCount]] = await pool.query(SQL.SELECT_boardheartCount, variable.board_number);
                    req.heart = {
                        boardHeart: count.count,
                    };
                    next();
                } else {
                    await pool.query(SQL.INSERT_boardheart, [variable.board_number, variable.userId]);
                    const [[heartCount]] = await pool.query(SQL.SELECT_boardheartCount, variable.board_number);
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
