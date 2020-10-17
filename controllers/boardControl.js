const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");
const multer = require("multer");
const fs = require("fs");
const { errorMsg } = require("../utils/myMessage");

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
            errorMsg(res, 400, viewERR.message);
            return console.log(viewERR);
        }
    },

    write: async (req, res, next) => {
        try {
            // 토큰 payload
            const { user_id, email, name, gender } = req.user;
            const { title, contents } = req.body;
            const file = "/upload/" + req.file.filename;
            const sql = `INSERT INTO board VALUES (null,?,?,NOW(),?,?,?,?,?,?)`;
            const data = [title, contents, file, 0, 0, user_id, name, gender];
            await pool.query(sql, data);
            next();
        } catch (writeERR) {
            errorMsg(res, 400, writeERR.message);
        }
    },
};
