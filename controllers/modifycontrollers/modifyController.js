const express = require("express");

const conn = require("../../config/database/db_connect")().init();
require("dotenv").config();
const bcrypt = require("bcrypt");
module.exports = {
    idModify: async (req, res, next) => {
        var oldUserId = req.params.user_id;
        var newUserId = req.body.user_id;
        var password = req.body.password;
        let search_sql = `SELECT * FROM users WHERE user_id =? AND password = ?`;
        await conn.query(search_sql, [oldUserId, password], async (error, results) => {
            if (error)
                return res.status(400).json({
                    success: false,
                    message: "아이디 수정 오류, db에서 select 과정중 오류발생",
                    error,
                });
            try {
                if (!results[0]) {
                    return res
                        .status(202)
                        .json({ susccess: false, message: "아이디 수정 오류, 아이디를 찾을 수 없습니다." });
                }
                var update_sql = `UPDATE users SET user_id = ? WHERE user_id =? AND password = ?`;
                await conn.query(update_sql, [newUserId, oldUserId, password], async (error, resultsUpdate) => {
                    if (error)
                        return res.status(400).json({
                            sueccess: false,
                            message: "아이디 변경 중 알 수 없는 오류 발생.",
                            error,
                        });
                    if (resultsUpdate.changedRows === 0) {
                        return res.status(400).json({
                            success: false,
                            message: "수정하려는 아이디가 이전 아이디와 동일합니다.",
                        });
                    } else {
                        return res.status(200).json({
                            success: true,
                            message: "아이디 변경에 성공했습니다. 변경된 아이디 : " + newUserId,
                        });
                    }
                });
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "알 수 없는 오류",
                    error: error.toString(),
                });
            }
        });
        next();
    },
    passwordModify: async (req, res, next) => {
        var userId = req.params.user_id;
        var oldPassword = req.body.password;
        var newPassword = req.body.new_password;
        let search_sql = `SELECT * FROM users WHERE user_id=? AND password=?`;
        conn.query(search_sql, [userId, oldPassword], async (error, results) => {
            if (error)
                return res.status(400).json({
                    success: false,
                    message: "비밀번호 수정 오류, db에서 select 과정 중 오류",
                    error,
                });
            try {
                if (!results[0]) {
                    return res
                        .status(202)
                        .json({ success: false, message: "비밀번호 수정 오류. 일치하는 데이터를 찾을 수 없습니다." });
                }
                var update_sql = `UPDATE users SET password =? WHERE user_id = ? AND password = ?`;
                await conn.query(update_sql, [newPassword, userId, oldPassword], async (error, resultsUpdate) => {
                    if (error)
                        return res.status(400).json({
                            success: false,
                            message: "비밀번호 수정 오류, UPDATE 단계에서 오류발생.",
                            error,
                        });
                    if (resultsUpdate.changedRows === 0) {
                        return res.status(400).json({
                            success: false,
                            message: "수정하려는 비밀번호가 이전 비밀번호와 동일합니다.",
                        });
                    } else {
                        return res.status(200).json({
                            success: true,
                            message: "비밀번호 변경에 성공했습니다. 변경된 비밀번호 : " + newPassword,
                        });
                    }
                });
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "알 수 없는 오류",
                    error: error.toString(),
                });
            }
        });
    },
};
