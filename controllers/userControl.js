const bcrypt = require("bcrypt");

const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

module.exports = {
  login: async(req, res, next) => {
    const { user_id, password } = req.body;

    if (user_id == null || password == null) {
      return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
    }
    try {
      const data=await pool.query(SQL.SELECT_userid, user_id);
      console.log(data[0])
      
    } catch (loginERR) {
      return errorMsg(res, 300, loginERR.message);
    }
    next();
  },

  signup: async (req, res, next) => {
    const { user_id, email, password, name, gender, age } = req.body;

    if (
      user_id == null ||
      email == null ||
      password == null ||
      name == null ||
      gender == null ||
      age == null
    ) {
      return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
    }

    try {
      await pool.query(SQL.INSERT_all, req.body);
    } catch (signupERR) {
      return errorMsg(res, 300, signupERR.message);
    }
    next();
  },
};

// if (user_id == null && password == null) {
//   return myMessage(500, false, "실패패");
// }

// let sql = `SELECT * FROM users WHERE user_id =?`;
// conn.query(sql, [user_id], function (error, results) {
//   if (error) {
//     return res.json({
//       code: 400,
//       success: false,
//       error,
//     });
//   }
//   if (!results[0]) {
//     return res.status(202).json({
//       success: false,
//       message: "아이디를 확인해주세요.",
//     });
//   }
//   const checkPw = () => {
//     // bcrypt.compare 콜백함수에서 isMatch는 true or false를 반환해준다.
//     // 암호화된 패스워드 체크
//     // test_1
//     bcrypt.compare(password, results[0].password, function (err, isMatch) {
//       if (err)
//         return res.status(400).json({
//           success: false,
//           err,
//         });
//       if (isMatch) {
//         console.log("아이디 패스워드가 일치합니다.");
//         return res.status(200).json({
//           seccess: true,
//           message: "아이다와 패스워드가 일치합니다.",
//         });
//       }
//     });
//   };
//   checkPw();
// });

