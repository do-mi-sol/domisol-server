const express = require("express");
const router = express.Router();

const { login, signup, widthdrawal, account } = require("../controllers/userControl");

const { signToken, verifyToken } = require("../controllers/tokenControl");

const { idModify, passwordModify } = require("../controllers/modifycontrol");

const { idFind, passwordFind } = require("../controllers/findcontrol");

const myResponse = require("../utils/myResponse");

/**
 * @method POST
 * @summary Login o
 */
router.post("/login", login, signToken, (req, res) => {
    res.status(201).json(
        myResponse(true, "login 성공", "data", {
            token: req.token,
        })
    );
});

/**
 * @method POST
 * @summary SignUp o
 */
router.post("/signup", signup, (req, res) => {
    res.status(201).json(myResponse(true, "signup 성공"));
});

/**
 * @method POST
 * @summary Account o
 */
router.post("/account", account, verifyToken, (req, res) => {
    res.json(
        myResponse(true, "account 성공", "data", {
            user: req.user,
        })
    );
});

/**
 * @method PUT
 * @summary ID_Modify o
 */
router.put("/account/idmodify", verifyToken, idModify, (req, res) => {
    res.json(myResponse(true, "idModify 성공"));
});

/**
 * @method PUT
 * @summary PW_Modify
 */

router.put("/account/passwordmodify", verifyToken, passwordModify, (req, res) => {
    res.json(myResponse(true, "passwordModify 성공"));
});

/**
 * @method DELETE
 * @summary Withdrawal
 */
router.delete("/account/withdrawal", widthdrawal, (req, res) => {
    res.json(myResponse(true, "계정 삭제 성공"));
});

/**
 * @method POST
 * @summary ID_Find
 */
router.post("/find/idfind", idFind, (req, res) => {
    res.json(myResponse(true, "idFind 성공", "user_id", res.locals.user_id));
});

/**
 * @method POST
 * @summary PW_Find
 */
router.post("/find/passwordfind", passwordFind, (req, res) => {
    res.json(myResponse(true, "passwordFInd 성공", "password", res.locals.password));
});

module.exports = router;
