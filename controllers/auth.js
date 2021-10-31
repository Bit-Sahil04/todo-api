const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postRegister = (req, res, next) => {
  const { username, password, email } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        throw new Error("Error: username already taken!");
      }
      return;
    })
    .then(() => bcrypt.genSalt(12))
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPass) => {
      const u = new User({
        username: username,
        password: hashedPass,
        email: email,
        tasks: [],
      });
      return u.save();
    })
    .then(() => res.status(201).send(`User ${username} registered!`))
    .catch((err) => {
      console.log(err);
      return res.status(400).send(err.message);
    });
};

exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(400).send("400 Error: invalid credentials!");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (matched) {
          //TODO: handle sessions
          const token = jwt.sign(
            { _id: user._id, date: Date.now() },
            process.env.JWT_SECRET
          );
          res
            .header("auth-token", token)
            .status(200)
            .send(`Welcome in: ${username}!\n${token}`);
        } else {
          res.status(400).send("400 Error: invalid credentials!");
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    });
};
