const express = require("express");
const { createConnection } = require("mysql");

module.exports = {
  login: (res, req, next) => {
    const { id, name, password, email, age } = req.body;
    if (id == null || password == null)
      return onmessageerror("error", res, req);

    try {
    } catch {}
  },

  signup: (res, req, next) => {
    const users = {
      user_id: req.body.user_id,
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      age: req.body.age,
    };

    // const { id, name, password, email, age } = req.body;

    createConnection.query("INSERT INTO users SET ?", users, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
        res.send({
          code: 400,
          result: "error",
        });
      } else {
        console.log("solution :", results);
        res.send({
          code: 400,
          result: "success",
        });
      }
    });
    next();
  },
};
