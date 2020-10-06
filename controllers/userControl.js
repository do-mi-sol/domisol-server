const express = require("express")

//DB connect
// const db = require("../config/database/db_config");
const conn = require("../config/database/db_connect")().init()
const bcrypt = require("bcrypt")
const e = require("express")
const jwt = require("jsonwebtoken")
const YOUR_SECRET_KEY = process.env.SECRET_KEY

const saltRounds = 10

module.exports = {
    login: (req, res, next) => {
        let user_id = req.body.user_id
        let password = req.body.password
        let sql = `SELECT * FROM users WHERE user_id =?`
        conn.query(sql, [user_id], function (error, results) {
            if (error) {
                return res.json({
                    code: 400,
                    success: false,
                    error,
                })
            }
            if (!results[0]) {
                return res.status(202).json({
                    success: false,
                    message: "아이디를 확인해주세요.",
                })
            }
            const checkPw = () => {
                // bcrypt.compare 콜백함수에서 res는 true or false를 반환해준다.
                // 암호화된 패스워드 체크
                bcrypt.compare(password, results[0].password, function (err, isMatch) {
                    if (err)
                        return res.status(400).json({
                            success: false,
                            err,
                        })
                    if (isMatch) {
                        console.log("아이디 패스워드가 일치합니다.")
                        return res.status(200).json({
                            seccess: true,
                            message: "아이다와 패스워드가 일치합니다.",
                        })
                    }
                })
            }
            checkPw()
        })
    },

    signup: (req, res, next) => {
        var users = {
            user_id: req.body.user_id,
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
        }

        // const { id, name, password, email, age } = req.body
        var search_sql = `SELECT user_id FROM users WHERE user_id =?`
        // conn.query_0 start
        conn.query(search_sql, users.user_id, async (error, results) => {
            if (error) {
                return res.status(400).json({ success: false, error })
            } else {
                if (results[0]) {
                    if (result[0].user_id === users.user_id) {
                        console.log("이미 동일한 아이디가 존재합니다.")
                        return res.status(202).json({
                            seccess: false,
                            message: "이미 동일한 아이디가 존재합니다.",
                        })
                    }
                } // 이미 가입된 회원 있는지 확인
                bcrypt.genSalt(saltRounds, (err, salt, next) => {
                    if (err) return next(err)
                    bcrypt.hash(users.password, salt, (err, hash) => {
                        if (err) return next(err)
                        users.password = hash
                        var sql = `INSERT INTO users SET ?`
                        // conn.query_1 start
                        conn.query(sql, users, function (error, results) {
                            if (error) {
                                return res.json({
                                    code: 400,
                                    success: false,
                                    error,
                                })
                            } else {
                                return res.status(200).json({ success: true })
                            }
                        }) // conn.query_1, 중복 회원 없을 시 db저장
                    })
                })
            }
        }) // conn.query_0
        next()
    },
}
