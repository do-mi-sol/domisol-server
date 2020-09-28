const express = require("express")
const router = express.Router()

const mysql = require("mysql")
const db_config = require("../config/database/db_config")
const connection = mysql.createConnection(db_config)

const controller = require("../controllers/userControl")
router.use(connection)

/**
 * @method POST
 * @summary Login
 */
router.post("/login", (req, res) => {
    res.status(201).send("/login : complete")
})

/**
 * @method POST
 * @summary SignUp
 */
// router.post("/signup", (req, res) => {
//     res.send("signup")
// })

router.post("/signup", controller.signup)

/**
 * @method POST
 * @summary Account
 */
router.post("/account", (req, res) => {
    res.send("account")
})

/**
 * @method PUT
 * @summary ID_Modify
 */
router.put("/account/idmodify", (req, res) => {
    res.send("idmodify")
})

/**
 * @method PUT
 * @summary PW_Modify
 */
router.put("/account/passwordmodify", (req, res) => {
    res.send("passwordmodify")
})

/**
 * @method DELETE
 * @summary Withdrawal
 */
router.delete("/account/withdrawal", (req, res) => {
    res.send("withdrawal")
})

/**
 * @method POST
 * @summary ID_Find
 */
router.post("/find/idfind", (req, res) => {
    res.send("passwordmodify")
})

/**
 * @method POST
 * @summary PW_Find
 */
router.post("/find/passwordfind", (req, res) => {
    res.send("passwordfind")
})

module.exports = router
