const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
let userSchema = require("./model");
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/mydatabase1", { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("We are connected!");

  app.post("/signup", (req, res) => {
    const user1 = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    user1.save(function(err, user) {
      if (user != null) {
        console.log("user successfully added", user);
        res.status(200).send();
      } else {
        console.log("error 400");
        res.status(400).send();
      }
    });
  });
  app.post("/login", (req, res) => {
    const query = {
      email: req.body.email,
      password: req.body.password
    };
    userSchema.find(query, function(err, result) {
      if (result.length === 0) {
        console.log("wrong credential");
        res.status(404).send();
      } else {
        const objToSend = {
          name: result[0].name,
          email: result[0].email
        };
        console.log("I find user");
        res.status(200).send(JSON.stringify(objToSend));
      }
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
