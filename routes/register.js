const express = require("express");
const router = require('express').Router();
const helper = require("../helper");
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.get("/register", (req, res) => {
    //checks if user eixts or is logged in
    if (req.session.userId) {
      res.redirect("/todos");
    } else {
      let templateVars = {
        user: { id: undefined, name: null }
      };
      res.render("..views/register", templateVars);
    }
  });

  //route that does the registering
  router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.render("register", {
        error: "Email or Password was not provided"
      });
    }
    if (helper.emailVerify(req.body.email)) {
      return res.render("register", {
        error: "Email already exists, please login"
      });
    }
    // to adjust after bcrypt
    let password = bcrypt.hashSync(req.body.password, 10);
    db.query(`
      INSERT INTO user(name, email, password)
      VALUES($1, $2, $3)
      RETURNING *`,
    [req.body.name, req.body.email, password])
      .then(data => {
        const newUser = data.rows[0];
        req.session.userId = newUser.id;
        res.redirect('/todos');
      });
  });
  return router;
};
