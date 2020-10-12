const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/userControl");

const { signToken, verifyToken } = require("../controllers/tokenController")

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
router.put("/account/idmodify", (req, res) => {
  res.send("idmodify");
});

/**
 * @method PUT
 * @summary PW_Modify
 */
router.put("/account/passwordmodify", (req, res) => {
  res.send("passwordmodify");
});

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
