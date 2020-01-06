const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const bodyParser = require("body-parser");
const userSchema = require("./model");
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
    const password = req.body.password;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    try {
      const user1 = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: hash
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
    const password = req.body.password;
    try {
      const user = await userSchema
        .findOne({
          email: req.body.email
        })
        .exec();
      const match = await bcrypt.compare(password, user.password);
      if (match && user) {
        const objToSend = {
          name: user.name,
          email: user.email
        };
        res.status(200).send(JSON.stringify(objToSend));
      } else {
        res.status(404).send();
      }
    } catch {
      res.sendStatus(500);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
