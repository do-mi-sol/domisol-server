const express = require("express");
const router = express.Router();
const upload = require("../config/etc/etc_config").upload;

const { verifyToken } = require("../controllers/tokenControl");
const { view, write, boardDetail, like } = require("../controllers/boardControl");

const myResponse = require("../utils/myResponse");

/**
 * @method GET
 * @summary MainBoard
 */
router.get("/main", view, async (req, res) => {
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
 * @method GET
 * @summary BoardDetail
 */
router.get("/board-detail/:board_number", boardDetail, (req, res) => {
    res.json(myResponse(true, "detail 성공", "data", req.detail));
});

router.get("/like", like, (req, res) => {
    res.json(myResponse(true, "like 성공", "data", req.heart));
});
/**
 * @method PUT
 * @summary WriteModify
 */
router.put("/writemodify", (req, res) => {
    res.json(myResponse(true, "writemodify 성공"));
});

module.exports = router;
