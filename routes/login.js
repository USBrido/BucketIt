const router = require("express").Router();
const helper = require("../helper");
const bcrypt = require("bcrypt");

module.exports = db => {
  //set login if user is logged or not
  router.get("/", (req, res) => {
    console.log("GET /login");
    if (req.session.userId) {
      res.redirect("/:userId");
    } else {
      let templateVars = {
        user: { id: undefined, name: null }
      };
      res.render("/", templateVars);
    }
  });
  //Set login with cookie
  router.post("/", (req, res) => {
    console.log("POST /login");
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
          res.render("/register", { error: "Email and password combination is invalid" });
        }
      })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  });
  return router;
};
