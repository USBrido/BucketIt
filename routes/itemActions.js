const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Deletes items ()
  router.post("/:userId/:id/:item/delete", (req, res) => {
    const user = req.session.userId;
    if (user) {
      delete itemdb[req.params.item];
      res.redirect('/:userid');
    } else {
      res.redirect("/login")
    }
  });
  return router;
};
