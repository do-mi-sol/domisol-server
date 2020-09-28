const express = require("express")
const app = express()

//DB connect
const mysql = require("mysql")
const db_config = require("./config/database/db_config")
const connection = mysql.createConnection(db_config)

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//router
const indexRouter = require("./routes/index")
app.use("/", indexRouter)
const userRouter = require("./routes/user")
app.use("/api/user", userRouter)

//start the server
app.listen(3001, () => {
    console.log("도미솔 웹 서버  ->  " + "http://localhost:3001")
})
