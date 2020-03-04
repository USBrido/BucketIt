const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Deletes items ()
  router.post("/urls/:shortURL/delete", (req, res) => {
    const user = req.session.userId;
    if (user) {
      delete itemdb[req.params.item];
      res.redirect('/main/:id');
    } else {
      res.redirect("/login")
    }
  });

  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM widgets`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const widgets = data.rows;
  //       res.json({ widgets });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
};
