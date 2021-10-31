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

// just experimenting with async await version of above code (untested)

exports.test = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token){
    return res.status(403).send("Access Denied.");
  }
  else{
    try{
      const verification = jwt.verify(token, process.env.JWT_SECRET);
      if (verification){
        req.user = await User.findById(verification._id);
        return next();  
      }
      else{
        return res.status(400).send("Invalid Token");
      }
    }
    catch{
      res.status(500).send("Auth Error");
    }
  }
}
