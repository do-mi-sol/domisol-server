const express = require("express")
const app = express()
const bodyParser = require("body-parser")
//DB connect
const db = require("./config/database/db_config.js")

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//router
const indexRouter = require("./routes/index")
app.use("/", indexRouter)
const userRouter = require("./routes/user")
app.use("/api/user", userRouter)

//start the server
app.listen(3001, () => {
    console.log("도미솔 웹 서버  ->  " + "http://localhost:3001")
})
