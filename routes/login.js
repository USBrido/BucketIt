const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //set login
  router.get("/login", (req, res) => {
    if (req.session.userId) {
      res.redirect('/main/userId');
    } else {
      res.render("/main");
    }

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
