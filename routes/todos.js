const router = require("express").Router();
const bcrypt = require("bcrypt");
const {callItem, media, books, food} = require("../callItem");
const cookieSession = require('cookie-session');
const walkObject = require("walk-object");

module.exports = (db) => {
  //displays item in the todo view
  router.get('/todos', (req, res) => {
    let templatevars = {};
    db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((data) => {
        templatevars.user = data.rows[0];
        db.query('SELECT * FROM items WHERE id = $1', [req.session.user_id])
          .then((data) => {
            templatevars.user = data.rows;
            res.removeHeader('items', templatevars);
          });
      });
  });


  //posts item to database
  router.post('/todos', (req, res)  => {
    const item = req.body.input;
    callItem(item).then(data => {
      let roughresult = '';
      walkObject(JSON.parse(data).queryresult, ({value}) => {
        if (typeof value === 'string') {
          roughresult += ` ${value}`;
        }
      });
      if (data.error === "Item not found!") {
        console.log("Item not found!");
      //film and tv
      } else if (media.some(result => {
        if (roughresult.includes(result)) {
          console.log(result);
          return roughresult.includes(result);
        }
      })) {
        db.query(`INSERT INTO items(input, category_id, user_id) VALUES($1, $2, $3) RETURNING *;`,
          [req.body.input, categories['filmAndTv'], req.session.user_id])
          .then(data => {
            res.redirect('/todos');
          });
      //books
      } else if (books.some(result => {
        if (roughresult.includes(result)) {
          console.log(result);
          return roughresult.includes(result);
        }
      })) {
        db.query(`INSERT INTO items(input, category_id, user_id) VALUES($1, $2, $3) RETURNING *;`,
          [req.body.input, categories['books'], req.session.user_id])
          .then(data => {
            res.redirect('/todos');
          });
      //food and restaurants
      } else if (food.some(result => {
        if (roughresult.includes(result)) {
          console.log(result);
          return roughresult.includes(result);
        }
      })) {
        db.query(`INSERT INTO items(input, category_id, user_id) VALUES($1, $2, $3) RETURNING *;`,
          [req.body.input, categories['restaurant'], req.session.user_id])
          .then(data => {
            res.redirect('/todos');
          });
      }  else {
        db.query(`INSERT INTO items(input, category_id, user_id) VALUES($1, $2, $3) RETURNING *;`,
          [req.body.input, categories['products'], req.session.user_id])
          .then(data => {
            res.redirect('/todos');
          });
      }

    });
  });

  const categories = {};
  db.query(`SELECT id, category FROM categories;`).then(data => {
    for (let row of data.rows) {
      categories[row.category] = row.id;
    }
  });

  return router;
};
