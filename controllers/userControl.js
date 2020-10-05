const express = require("express")

//DB connect
// const db = require("../config/database/db_config");
const conn = require("../config/database/db_connect")().init()

module.exports = {
    login: (req, res, next) => {
        let user_id = req.body.user_id
        let password = req.body.password
        let sql = `SELECT * FROM users WHERE user_id =?`
        conn.query(sql, [user_id], function (error, result) {
            console.log("result :", result)
            if (error) {
                res.json({
                    code: 400,
                    success: false,
                    error,
                })
            } else {
                if (!result[0]) {
                    res.status(202).json({
                        success: false,
                        message: "아이디를 확인해주세요.",
                    })
                } else {
                    if (result[0].password == password) {
                        console.log("아이디와 패스워드가 일치합니다.")
                        res.status(200).json({
                            success: true,
                            message: "아이디와 패스워드가 일치합니다.",
                        })
                    } else {
                        console.log("패스워드가 일치하지 않습니다.")
                        res.status(202).json({
                            success: false,
                            message: "패스워드가 일치하지 않습니다.",
                        })
                    }
                }
            }
        })
        next()
    },

    signup: (req, res, next) => {
        // 데이터 들어왔는지 확인
        // console.log(req.body)
        var users = {
            user_id: req.body.user_id,
            name: req.body.name,
            password: req.body.password,
            email: req.body.emai,
            age: req.body.age,
        }

        // const { id, name, password, email, age } = req.body;

        var sql = `INSERT INTO users SET ?`
        conn.query(sql, users, function (error, result) {
            if (error) {
                return res.json({
                    code: 200,
                    success: false,
                    error,
                })
            } else {
                return res.status(200).json({ success: true })
            }
        })
        next()
    },
}
