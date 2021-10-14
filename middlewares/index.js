const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

// const signonRouter = require("../routes/signon");
const taskRouter = require("../routes/tasks");

router.use(bodyParser.urlencoded({ extended: false }));
// router.use(signonRouter);
router.use(taskRouter);

router.get("/", (req, res) => {
  console.log("reached home");
  res.status(200).send("test");
});

module.exports = router;
