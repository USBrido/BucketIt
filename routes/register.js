const express = require('express');
const router  = express.Router();
const helper = require("../helper")

module.exports = (db) => {
  router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.render("register", { error: 'Email or Password was not provided' });
    };
    if (helper.emailVerify(req.body.email)) {
      return res.render("register", { error: 'Email already exists, please login' });
    };
    //to adjust after bcrypt
    let newUser = { userId: userId, email: req.body.email, password: bcrypt.hashSync(req.body.password, 10) };
    users[userId] = newUser;
    req.session.userId = userId;
    res.redirect("/main/:userId"); //to adjust
  return router;
})};
