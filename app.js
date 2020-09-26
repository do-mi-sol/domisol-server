const express = require("express");
const app = express();

//db 생성 및 연결
const mysql = require("mysql");
const db_config = require("./config/database/db_config");
const connection = mysql.createConnection(db_config);

//미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const userRouter = require("./routes/user");
app.use("/user", userRouter);

//서버 실행
app.listen(3001, () => {
  console.log("도미솔 웹 서버 " + "::" + " http://localhost:3001/");
});
