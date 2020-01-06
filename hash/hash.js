const bcrypt = require("bcrypt");

let saltRounds = 10;
let myString = "Qwerty123";

// bcrypt.hash(myString, saltRounds, (err, hash) => {
//   if (!err) {
//     console.log(hash);
//   } else {
//     console.log(err);
//   }
// });

bcrypt.compare(
  myString,
  "$2b$10$F/TgyLEF/T2OY8Ps4m08seRwdaVZJucmHqfHK6bEcAQG7O5yPIC36",
  (err, res) => {
    if (!err) {
      console.log("Password correct: ", res);
    } else {
      console.log("Incorrect password!", err);
    }
  }
);
