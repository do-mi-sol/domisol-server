const express = require("express")
const router = express.Router()

//DB connect
const conn = require("../config/database/db_connect")().init()

//controller
const { login, signup } = require("../controllers/userControl")
const { signToken, verifyToken } = require("../controllers/tokenController")
const { idModify, passwordModify } = require("../controllers/modifycontrollers/modifyController")
const { encryption } = require("../controllers/crypto/cryptoController")
/**
 * @method POST
 * @summary Login
 */
router.post("/login", login, signToken, (req, res, next) => {
    return console.log("success")
})

/**
 * @method POST
 * @summary SignUp
 */
router.post("/signup", signup, (req, res) => {
    return console.log("success")
})

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
router.put("/account/idmodify/:user_id", idModify, (req, res) => {
    console.log("idModify middleware escape")
})

/**
 * @method PUT
 * @summary PW_Modify
 */
router.put("/account/passwordmodify/:user_id", passwordModify, (req, res) => {
    console.log("passwordModify middleware escape")
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

/**
 * @method GET
 * @summary TokenTest
 */
router.get("/test", verifyToken, (req, res) => {})

module.exports = router
