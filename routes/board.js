const express = require("express");
const router = express.Router();
const { upload } = require("../config/etc/etc_config");

const { verifyToken } = require("../controllers/tokenControl");
const { board, write, boardView, boardHeart, best } = require("../controllers/boardControl");

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
router.post("/write", verifyToken, upload, write, (req, res) => {
    res.status(200).json(myResponse(true, "write"));
});

/**
 * @method post
 * @summary BoardView
 */
router.post("/view", boardView, (req, res) => {
    res.json(myResponse(true, "view 성공", "data", { board_views: req.view }));
});

/**
 * @method post
 * @summary LIKE
 */
router.post("/heart", verifyToken, boardHeart, (req, res) => {
    res.json(myResponse(true, "heart 성공", "data", { board_heart: req.heart }));
});

module.exports = router;
