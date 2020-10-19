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
            const [boardData] = await pool.query(SQL.SELECT_boardnum + SQL.SELECT_boardlimit, [skip, skip, limit]);
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
            errorMsg(400, viewERR.message);
            return console.log(viewERR);
        }
    },

    write: async (req, res, next) => {
        try {
            // 토큰 payload
            const { user_id, email, name, gender } = req.user;
            const { title, contents } = req.body;
            const file = "/upload/" + req.file.filename;
            const data = [title, contents, file, 0, 0, user_id, name, gender];
            await pool.query(SQL.INSERT_board, data);
            next();
        } catch (writeERR) {
            errorMsg(400, writeERR.message);
        }
    },

    boardDetail: async (req, res, next) => {
        try {
            const board_number = req.params.board_number;
            const [[detail]] = await pool.query(SQL.SELECT_boardnumber, board_number);
            req.detail = {
                detail,
            };
            next();
        } catch (boardDetailERR) {
            errorMsg(400, boardDetailERR.message);
        }
    },

    like: async (req, res, next) => {
        // 좋아요를 누른 버튼이 content인지, comment인지 client에서 받아온다.
        // const variable = req.body.variable;
        try {
            const variable = {
                comment_number: 1,
                board_number: 2,
                userId: "test3",
            };
            if (variable.board_number && !variable.comment_number) {
                const sql = `SELECT * FROM board_heart WHERE board_number =? AND user_id = ?`;
                const [[searchHeart]] = await pool.query(sql, [variable.board_number, variable.userId]);
                if (searchHeart) {
                    const delSql = `DELETE FROM board_heart WHERE board_number=? AND user_id = ?`;
                    const del = await pool.query(delSql, [variable.board_number, variable.userId]);
                    const countSql = `SELECT count(*) count FROM board_heart WHERE board_number =?`;
                    const [[heartCount]] = await pool.query(countSql, variable.board_number);
                    req.heart = {
                        boardHeart: count.count,
                    };
                    next();
                } else {
                    const insSql = `INSERT INTO board_heart VALUES(null,?,?)`;
                    const ins = await pool.query(insSql, [variable.board_number, variable.userId]);
                    const countSql = `SELECT count(*) count FROM board_heart WHERE board_number =?`;
                    const [[heartCount]] = await pool.query(countSql, variable.board_number);
                    req.heart = {
                        boardHeart: heartCount.count,
                    };
                    next();
                }
            } else {
                const sql = `SELECT * FROM comment_heart WHERE comment_number =? AND board_number=? ANd user_id = ?`;
                const [[searchHeart]] = await pool.query(sql, [
                    variable.comment_number,
                    variable.board_number,
                    variable.userId,
                ]);
                if (searchHeart) {
                    const delSql = `DELETE FROM comment_heart WHERE comment_number=? AND board_number =? ANd user_id = ?`;
                    const del = await pool.query(delSql, [
                        variable.comment_number,
                        variable.board_number,
                        variable.userId,
                    ]);
                    const countSql = `SELECT count(*) count FROM comment_heart WHERE comment_number =? AND board_number =?`;
                    const [[heartCount]] = await pool.query(countSql, [variable.comment_number, variable.board_number]);
                    req.heart = {
                        commentHeart: heartCount.count,
                    };
                    next();
                } else {
                    const insSql = `INSERT INTO comment_heart VALUES(null,?,?,?)`;
                    const ins = await pool.query(insSql, [
                        variable.comment_number,
                        variable.board_number,
                        variable.userId,
                    ]);
                    const countSql = `SELECT count(*) count FROM comment_heart WHERE comment_number =? AND board_number =?`;
                    const [[heartCount]] = await pool.query(countSql, [variable.comment_number, variable.board_number]);
                    req.heart = {
                        commentHeart: heartCount.count,
                    };
                    next();
                }
            }
        } catch (likeERR) {
            errorMsg(400, likeERR.message);
        }
    },
};
