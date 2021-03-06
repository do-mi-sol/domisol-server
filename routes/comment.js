const express = require("express");
const router = express.Router();

const { comments, comment_write, comment_delete } = require("../controllers/commentControl");
const { verifyToken } = require("../controllers/tokenControl");

const myResponse = require("../utils/myResponse");

/**
 * @method POST
 * @summary comment
 */
router.post("/", comments, (req, res) => {
    res.status(201).json(
        myResponse(true, "comment 성공", "data", {
            comment: req.comment,
            board_heart: req.heart,
        })
    );
});

/**
 * @method POST
 * @summary comment_write
 */
router.post("/write", verifyToken, comment_write, (req, res) => {
    res.status(201).json(myResponse(true, "comment_write 성공"));
});

/**
 * @method DELETE
 * @summary comment_delete
 */
router.delete("/delete", comment_delete, (req, res) => {
    res.status(201).json(myResponse(true, "comment_delete 성공"));
});

module.exports = router;
