const router = require('express').Router();
const helper = require("../helper");
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.get("/", (req, res) => {
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
  router.post("/", (req, res) => {
    console.log("Print", req.body);
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // checks if use ris registered
    if (!email || !req.body.password) {
      return res.render("register", {
        error: "Email or Password was not provided"
      });
    }
    if (helper.emailVerify(email)) {
      return res.render("register", {
        error: "Email already exists, please login"
      });
    }
    db.query(`
      INSERT INTO users(name, email, password)
      VALUES($1, $2, $3)
      RETURNING *;`,
    [req.body.name, req.body.email, hashedPassword])
      .then(data => {
        const newUser = data.rows[0];
        req.session.userId = newUser.id;
        res.redirect('/todos');
      });

  });
  return router;
};
