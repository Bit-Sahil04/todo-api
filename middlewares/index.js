const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const authRouter = require("../routes/auth");
const taskRouter = require("../routes/tasks");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.json());

router.use(authRouter);
router.use(taskRouter);

router.get("/", (req, res) => {
  console.log("reached home");
  res.status(200).send("test");
});

module.exports = router;
