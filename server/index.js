const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
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

  app.post("/signup", async (req, res) => {
    try {
      const user1 = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      let saveUser = await user1.save();
      console.log(saveUser);
      res.status(200).send();
    } catch {
      console.log("already registered");
      res.status(400).send();
    }
  });
  app.post("/login", async (req, res) => {
    try {
      const query = {
        email: req.body.email,
        password: req.body.password
      };
      let findUser = await userSchema.find(query);
      if (findUser.length === 0) {
        res.status(404).send();
      } else {
        const objToSend = {
          name: findUser[0].name,
          email: findUser[0].email
        };
        res.status(200).send(JSON.stringify(objToSend));
      }
    } catch {
      res.sendStatus(500);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
