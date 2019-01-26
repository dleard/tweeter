"use strict";

// Basic express setup:
require('dotenv').config();
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");
const MONGODB_URI   = process.env.MONGODB_URI;
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['Wubba lubba dub dub'],

  maxAge: 24 * 60 * 60 * 1000
}));

const users = {};

// generate strings for ID's
const generateRandomString  = () => {
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    const numbers = [];
    
    numbers.push(Math.floor(Math.random() * 10) + 1 + 47);
    numbers.push(Math.floor(Math.random() * 26) + 1 + 64);
    numbers.push(Math.floor(Math.random() * 26) + 1 + 96);
    
    const index = Math.floor(Math.random() * 3);
    randomString += String.fromCharCode(numbers[index]);
  }
  return randomString;
};

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.get("/login", function(req, res) {
    var loginpath = path.join(__dirname, '../public','login.html');
    res.sendFile(loginpath);
  });

  app.post("/login", function(req, res) {
    const { handle, password } = req.body;
    let id = undefined;
    for (let key in users) {
      console.log(users[key].handle)
      if (users[key].handle === handle && bcrypt.compareSync(password, users[key].password)) {
        id = users[key].id;
      }
    }
    console.log(id);
    if (id === undefined) {
      res.send(403, 'invalid login');
    } else {
      req.session.user_Id = id;
      res.sendStatus(200, handle);
    }
  });

  app.get("/register", function(req, res) {
    var loginpath = path.join(__dirname, '../public','register.html');
    res.sendFile(loginpath);
  });

  app.post('/register', (req, res) => {
    const id = generateRandomString();
    console.log(req.body);
    // flag set to false for if a user email already exists in the db
    let existsFlag = 0;
    for (let key in users) {
      if (users[key].handle === req.body.handle) {
        //set flag to true if email is found
        existsFlag = 1;
      }
    }
      // send user back to registration page with error message if user email already exists
      if (existsFlag) {
        res.send(403, 'user already exists');
      } else {
        users[id] = {};
        users[id].id = id;
        users[id].username = req.body.username;
        users[id].handle = req.body.handle;
        users[id].password = bcrypt.hashSync(req.body.password, 10);
        console.log(users);
        req.session.user_Id = id;
        res.sendStatus(200);
      }
    // }
  });

  app.listen(process.env.PORT || PORT, () => {
    console.log("Tweeter app listening on port " + PORT);
  });
});