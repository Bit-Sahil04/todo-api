const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.checkAuth = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(403).send("Access Denied.");
  } else {
    const verification = jwt.verify(token, process.env.JWT_SECRET);
    if (verification) {
      User.findById(verification._id)
        .then((user) => {
          req.user = user;
        })
        .then(() => next())
        .catch((err) => {
          res.status(500).send("Auth Error");
          console.log(err);
        });
    } else {
      return res.status(400).send("Invalid Token");
    }
  }
};
