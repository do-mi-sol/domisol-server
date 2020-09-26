const { Router } = require("express");
const express = require("express");
const router = express.Router();

//db 생성 및 연결
const mysql = require("mysql");
const db_config = require("../config/database/db_config");
const connection = mysql.createConnection(db_config);

router.post("/login", (req, res) => {
  //   res.send("login 서버");
  connection.query("SELECT * from testdb", (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

router.post("/signup", (req, res) => {
  res.send("signup");
});

module.exports = router;
