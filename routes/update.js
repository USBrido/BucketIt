const express = require("express");
const router = require('express').Router();
const helper = require("../helper");
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.get("/:userId", (req, res) => {
    //checks if user eixts or is logged in
    if (!req.session.userId) {
      res.redirect("/login");
    } else {
      let templateVars = {
        user: req.session.userId
      };
      res.render("..views/update", templateVars);
    }
  });

  //route that does the registering
  router.post("/", (req, res) => {
    const password = bcrypt.hashSync(req.body.password, 10);
    db.query(`
      SELECT email, password
      FROM users
      WHERE id = $1;`,
    [req.session.userId])
      .then(data => {
        const user = data.rows[0];
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          req.redirect("/:userId");
        } else {
          db.query(`
          UPDATE users
          SET name = $1, password = $2,
          WHERE id = $3`,
          [req.body.name, password, req.session.userId])
            .then(() => {
              res.redirect('/:userId');
            });
        }
      });
  });
  return router;
};
