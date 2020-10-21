const express = require("express");
const router = express.Router();
const upload = require("../config/etc/etc_config").upload;

const { verifyToken } = require("../controllers/tokenControl");
const { board, write, boardDetail, like } = require("../controllers/boardControl");

const myResponse = require("../utils/myResponse");

/**
 * @method post
 * @summary MainBoard
 */
router.post("/", board, (req, res) => {
    res.status(200).json(myResponse(true, "mainpage", "board", req.board));
});

/**
 * @method POST
 * @summary Write
 */
router.post("/write", verifyToken, upload.single("file"), write, (req, res) => {
    res.status(200).json(myResponse(true, "write"));
});

/**
 * @method post
 * @summary BoardDetail
 */
router.post("/detail", boardDetail, (req, res) => {
    res.json(myResponse(true, "detail 성공", "data", req.detail));
});

/**
 * @method post
 * @summary LIKE
 */
router.post("/like", like, (req, res) => {
    res.json(myResponse(true, "like 성공", "data", req.heart));
});

module.exports = router;
