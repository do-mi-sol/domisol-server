const express = require("express");
const app = express();
const cors = require("cors");

let port = process.env.PORT || 9001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const userRouter = require("./routes/user");
app.use("/api/user", cors(), userRouter);
const boardRouter = require("./routes/board");
app.use("/api/board", boardRouter);
const commentRouter = require("./routes/comment");
app.use("/api/comment", cors(), commentRouter);

//start the server
app.listen(port);
