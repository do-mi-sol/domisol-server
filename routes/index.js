const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>도미솔 웹 서버</h1>");
});

module.exports = router;
