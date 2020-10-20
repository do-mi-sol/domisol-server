const express = require("express");
const app = express();
// const cors = require("cors");

let port = process.env.PORT || 9001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const userRouter = require("./routes/user");
app.use("/api/user", userRouter);
const boardRouter = require("./routes/board");
app.use("/api/board/", boardRouter);

//start the server
app.listen(port);
