const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, index: { unique: true, dropDups: true } },
  email: { type: String, index: { unique: true, dropDups: true } },
  password: String
});

module.exports = mongoose.model("user", userSchema);
