const express = require("express");
const router = express.Router();
const { upload } = require("../config/etc/etc_config");

const { verifyToken } = require("../controllers/tokenControl");
const { board, write, boardDetail, like, best } = require("../controllers/boardControl");

const myResponse = require("../utils/myResponse");

/**
 * @method post
 * @summary MainBoard
 */
router.post("/", board, (req, res) => {
    res.status(200).json(myResponse(true, "mainpage", "board", req.board));
});

/**
 * @method post
 * @summary Best
 */
router.post("/Best", best, (req, res) => {
    res.json(myResponse(true, "best 성공", "data", req.board));
});

/**
 * @method POST
 * @summary Write
 */
router.post("/write", verifyToken, write, (req, res) => {
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
