const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());
const Data = require("./data.json");
const passport = require("passport");
const passportHttp = require("passport-http");
app.use(express.static("Public"));

let users = Data.users;

app.get("/", (req, res) => {
  res.send("Welcome to my shop api demo");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const passwordHash = bcrypt.hashSync(req.body.password, 8);
  console.log(users.find((user) => user.username == req.body.username));

  if (users.find((user) => user.username == req.body.username) != undefined) {
    console.log("user already exists");
    res.sendStatus(409);
  } else {
    users.push({
      id: uuidv4(),
      username: req.body.username,
      password: passwordHash,
      email: req.body.email,
      receipts: [],
    });

    res.sendStatus(200);
  }
});

passport.use(
  new passportHttp.BasicStrategy(function (username, password, done) {
    const userResult = users.find((user) => user.username === username);
    if (userResult == undefined) {
      return done(null, false);
    }
    if (bcrypt.compareSync(password, userResult.password) == false) {
      return done(null, false);
    }
    done(null, userResult);
  })
);

app.get(
  "/userinfo/:name",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    const result = users.find((user) => user.username == req.params.name);
    console.log(result);
    res.json(result);
  }
);

app.post(
  "/login",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.json(req.user);
  }
);

app.post(
  "/login",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.json(req.user);
  }
);

app.put(
  "/newreceipt/:id",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    console.log(req.params.id);
    const result = users.findIndex((user) => user.id == req.params.id);
    // users[result][receipts].push(req.price);
    //  res.json(req.user);
    console.log(req.body);
    users[result]["receipts"].push({
      id: uuidv4(),
      Date: new Date(),
      Price: req.body.Price,
      Time: req.body.Time,
      Charger: req.body.Charger,
      Power: req.body.Power
    });
    res.json(users[result]["receipts"])
    console.log(users[result]["receipts"])
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
