const express = require("express");
const router = require("express").Router();
const helper = require("../helper");
const bcrypt = require("bcrypt");

module.exports = db => {
  //set login
  router.get("/login", (req, res) => {
    if (req.session.userId) {
      res.redirect("/:userId");
    } else {
      let templateVars = {
        user: { id: undefined, name: null }
      };
      res.render("..views/login", templateVars);
    }
  });
  //Set login with cookied
  router.post("/login", (req, res) => {
    db.query(`
      SELECT id, email, password
      FROM users
      WHERE email = $1;`,
    [req.body.email])
      .then(data => {
        const user = data.rows[0];
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          req.session.userId = user.Id;
          req.redirect("/:userId");
        } else {
          res.render("/", { error: "Email and password combination is invalid" });
        }
      })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  });
  return router;
};
