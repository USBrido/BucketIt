const express = require('express');
const router  = express.Router();
const helper = require("../helper");
const bcrypt = require ('bcrypt');


module.exports = (db) => {
  //set login
  router.get("/login", (req, res) => {
    if (req.session.userId) {
      res.redirect('/main/userId');
    } else {
      res.render("/main");
    };

    //Set login with cookied
  router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = helper.emailVerify(email, users);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.userId = userId;
      req.redirect('/main/:userId')
    } else {
      res.render('/', {error: 'Email and password combination is invalid'})
    };
  });

  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
})};
