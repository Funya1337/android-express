const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3000
const URL = 'mongodb://localhost:27017/mydatabase';

app.use(express.json());

MongoClient.connect(URL, (err, db) => {
  if (err) {
    console.log("Error while connecting mongo client")
  } else {
    const myDb = db.db('myDb')
    const collection = myDb.collection('myTable')
    app.post('/signup', (req, res) => {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      const query = { email: newUser.email }
      collection.findOne(query, (err, result) => {
        if (result === null) {
          collection.insertOne(newUser, (err, res) => {
            res.status(201).send();
          })
        } else {
          res.status(400).send();
        }
      })
    })
    app.post('/login', (req, res) => {
      const query = {
        email: req.body.email,
        password: req.body.password,
      }
      collection.findOne(query, (err, result) => {
        if (result != null) {
          const objToSend = {
            name: result.name,
            email: result.email
          }
          res.status(201).send(JSON.stringify(objToSend));
        } else {
          res.status(404).send();
        }
      })
    })
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
