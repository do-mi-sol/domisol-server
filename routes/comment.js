const express = require("express");
const router = express.Router();

const myResponse = require("../utils/myResponse");

/**
 * @method POST
 * @summary comment
 */
router.post("/", (req, res) => {
    res.status(201).json(myResponse(true, "comment 성공"));
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
