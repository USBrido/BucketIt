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
    // const password = req.body.password;
    // const newPassword =
  });
  return router;
};
