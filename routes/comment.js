const express = require("express");
const router = express.Router();

const { comments } = require("../controllers/commentControl");

const myResponse = require("../utils/myResponse");

/**
 * @method POST
 * @summary comment
 */
router.post("/", comments, (req, res) => {
    res.status(201).json(
        myResponse(true, "comment 성공", "data", {
            comment: req.comment,
        })
    );
});

/**
 * @method POST
 * @summary comment_write
 */
router.post("/write", (req, res) => {
    res.status(201).json(myResponse(true, "comment 성공"));
});

/**
 * @method POST
 * @summary comment_delete
 */
router.post("/delete", (req, res) => {
    res.status(201).json(myResponse(true, "comment 성공"));
});

module.exports = router;
