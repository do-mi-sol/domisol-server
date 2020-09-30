const express = require("express")
const router = express.Router()

//DB connect
const db = require("../config/database/db_config")

router.get("/", (req, res) => {
    res.send("<h1>도미솔 웹 서버</h1>")
})

module.exports = router
