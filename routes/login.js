const router = require("express").Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  //set login if user is logged or not
  router.get("/", (req, res) => {
    if (req.session.isLogged) {
      res.redirect("/");
    }
  });

  router.post("/", (req, res) => {
    console.log("Print", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json(`Email and Password combination don't match`);
    }

    db.query(`
      SELECT  id, email, password
      FROM users
      WHERE email = $1;`,[email])
      .then(data => {
        console.log(data);
        const isValid = bcrypt.compareSync(password, data.rows[0].password);
        if (isValid) {
          let session = req.session;
          session.isLogged = true;
          session.email = email;
          res.redirect("/");
        } else {
          res.redirect(400, "/register");
        }
      })
      .catch(error => {
        res.status(500).json(`Error login in`);
      });
  });

  return router;
};
