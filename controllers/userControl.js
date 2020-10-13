const express = require("express");
const bcrypt = require("bcrypt");
// const {domisolSalt} = require("../config/etc/etc_config")
const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

const compare = async (userPassword,dbPassword)=>{
  const c=bcrypt.compareSync(userPassword,dbPassword)
  console.log("야야야야야야ㅑ야야야야"+c);
  return c
}

module.exports = {
  login: async (req, res, next) => {
    const { user_id, password } = req.body;

    if (user_id == "" || password == "") {
      return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
    }

    try {
    const id_pw_Data=await pool.query(SQL.SELECT_userid,user_id);
    console.log(password);
    console.log(id_pw_Data[0]);

      if(id_pw_Data[0]==null){
        return errorMsg(res, 400, "잘못된 id 또는 password입니다.")
      }else{
        if(compare(password, id_pw_Data[0].password)){
          next()
      }else return errorMsg(res,400,"password가 맞지않음")
      }
    } catch (loginERR) {
      return errorMsg(res, 300, loginERR.message);
    }
  },


  signup: async (req, res, next) => {
     const { user_id, email, password, name, gender, age } = req.body;
    if (
      user_id == "" ||
      email == "" ||
      password == "" ||
      name == "" ||
      gender == "" ||
      age == ""
    ) {
      return errorMsg(res, 300, "채워지지 않은 정보가 있습니다.");
    }

    try {
      const idData=await pool.query(SQL.SELECT_userid, user_id);
      const emailData=await pool.query(SQL.SELECT_email, email);

      if(!idData[0]||!emailData[0]) return errorMsg(res, 300, "존재하는 id 또는 email 입니다.")
      else{
        req.body.password=await bcrypt.hash(password,10)
        await pool.query(SQL.INSERT_all, req.body);
      }
      
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
