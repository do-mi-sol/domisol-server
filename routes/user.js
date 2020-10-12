const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/userControl");

const { signToken, verifyToken } = require("../controllers/tokenController")

const { idModify, passwordModify } = require("../controllers/modifycontrollers/modifyController")
const { encryption } = require("../controllers/crypto/cryptoController")


const myResponse = require("../utils/myResponse");

/**
 * @method POST
 * @summary Login
 */
router.post("/login", login, (req, res) => {
  res.json(myResponse(true, "login 성공"));

});

/**
 * @method POST
 * @summary SignUp
 */
router.post("/signup", signup, (req, res) => {
  res.json(myResponse(true, "signup 성공"));
});

/**
 * @method POST
 * @summary Account
 */
router.post("/account", (req, res) => {
  res.json(myResponse(true, "account 성공"));
});

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
  res.send("withdrawal");
});

/**
 * @method POST
 * @summary ID_Find
 */
router.post("/find/idfind", (req, res) => {
  res.send("passwordmodify");
});

/**
 * @method POST
 * @summary PW_Find
 */
router.post("/find/passwordfind", (req, res) => {
  res.send("passwordfind");
});

/**
 * @method GET
 * @summary TokenTest
 */
router.get("/test", verifyToken, (req, res) => {})

module.exports = router
