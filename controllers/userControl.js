const { json } = require("body-parser")
const express = require("express")

//DB connect
const db = require("../config/database/db_config")

module.exports = {
    login: (req, res, next) => {},
    signup: (req, res, next) => {
        // 데이터 들어왔는지 확인
        // console.log(req.body)
        var users = {
            user_id: req.body.user_id,
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
        }

        // const { id, name, password, email, age } = req.body;

        var sql = `INSERT INTO users SET ?`
        db.query(sql, users, function (error, result) {
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
