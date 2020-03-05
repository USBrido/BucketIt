// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const bcrypt     = require('bcrypt');
const cookieSession = require ('cookie-session')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

//Cookie-Session setup
app.use(cookieSession({
  name: 'session',
  keys: ['userId']
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Routes for resources
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
// Mounted Routes
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/register", registerRoutes(db));
app.use("/api/login", loginRoutes(db));
app.use("/api/logout", logoutRoutes(db));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
