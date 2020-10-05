const express = require("express");
const router = express.Router();

//DB connect
const conn = require("../config/database/db_connect")().init();

//controller
const { login, signup } = require("../controllers/userControl");

/**
 * @method POST
 * @summary Login
 */
router.post("/login", (req, res) => {
  //   conn.query("SELECT * from user", (error, rows) => {
  //     if (error) throw error;
  //     res.send(rows);
  //   });
  res.status(200).json("성공");
});

/**
 * @method POST
 * @summary SignUp
 */
router.post("/signup", signup, (req, res) => {
  return console.log("success");
});

/**
 * @method POST
 * @summary Account
 */
router.post("/account", (req, res) => {
  res.send("account");
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

module.exports = router;
