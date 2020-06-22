const router = require('express').Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  router.get("/", (req, res) => {
    //checks if user eixts or is logged in
    if (req.session.isLogged) {
      res.redirect("/");
    } else {
      res.status(400).json("please loggin");
    }
  });

  //route that does the registering
  router.post("/", (req, res) => {
    console.log("Print", req.body);

    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      return res.status(500).json('Incorrect form submission');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.query(`SELECT email
    FROM users
    WHERE email = $1;`, [req.body.email])
      .then(data => {
        const user = data.rows[0];
        if (user) {
          res.statusCode = 400;
          res.end('400 Bad request. Email already registered');
        } else {
          db.query(`
          INSERT INTO users(name, email, password)
          VALUES($1, $2, $3)
          RETURNING *;`,
          [name, email, hash])
            .then(data => {
              let session = req.session;
              session.isLogged = true;
              session.email = email;
              res.redirect('/');
            });
        }
      });
  });
  return router;
};
