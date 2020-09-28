const express = require("express")
const { createConnection } = require("mysql")

module.exports = {
    login: (res, req, next) => {},
    signup: (res, req, next) => {
        var users = {
            user_id: req.body.user_id,
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
        }
        createConnection.query("INSERT INTO users SET ?", users, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.send({
                    code: 400,
                    result: "error",
                })
            } else {
                console.log("solution :", results)
                res.send({
                    code: 400,
                    result: "success",
                })
            }
        })
        next()
    },
}
