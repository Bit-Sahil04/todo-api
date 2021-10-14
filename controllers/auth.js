const User = require("../models/user");
const Tasks = require("../models/tasks");
const bcrypt = require("bcryptjs");

exports.postRegister = (req, res, next) => {
  const { username, password, email } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        throw new Error("409 Error: username already taken!");
      }
      return;
    })
    .then(() => bcrypt.hash(password, 12))
    .then((hashedPass) => {
      const u = new User({
        username: username,
        password: hashedPass,
        email: email,
        tasks: [],
      });
      return u.save();
    })
    .then(() => res.status(201).send(`User ${username} created!`))
    .catch((err) => {
      console.log(err);
      return res.status(404).send(err.message);
    });
};

exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(404).send("404 registered username not found");
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (matched) {
        //TODO: handle sessions
        return res.status(200).send(`Welcome in: ${username}!`);
      } else {
        return res.status(404).send("404 Sorry, invalid credentials!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err.message);
    });

};
