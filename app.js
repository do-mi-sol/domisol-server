const express = require("express");

//db 생성 및 연결
const mysql = require("mysql");
const db_config = require("./config/database/db_config");
const connection = mysql.createConnection(db_config);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("시작");
});

app.get("/user", (req, res) => {
  connection.query("SELECT * from testdb", (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.listen("9001", () => {
  console.log("http://localhost:9001/");
});
