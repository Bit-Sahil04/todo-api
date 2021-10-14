const Tasks = require("../models/tasks");
// const User = require('../models/user');

const errReporter = (err, res) => {
  console.log(err);

  res.status(413).send(err.stringify());
};

const taskPubView = (task) => {
  return {
    name: task.name,
    desc: task.desc,
    priority: task.priority,
    createdOn: task.createdOn,
    updatedOn: task.updatedOn,
    deadLine: task.deadLine,
  };
};

exports.getTasks = (req, res, next) => {
  //serve tasks for specific user ( all users until registration is implemented )
  Tasks.find()
    .then((tasks) => {
      if (tasks.length) {
        const t = tasks.map((e) => {
          return taskPubView(e);
        });
        return res.status(200).send(t);
      }
      const t = "No tasks here! Time to nap!";
      return res.status(200).send(t);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err.message);
    });
};

exports.postAddTask = (req, res, next) => {
  const taskParams = req.query;

  if (!taskParams.name || !taskParams.desc)
    return res
      .status(400)
      .send(
        `Missing required argument <${!taskParams.name ? "name" : "desc"} > !!`
      );

  Tasks.findOne({ name: taskParams.name })
    .then((task) => {
      if (task) {
        throw new Error(
          `Task ${taskParams.name} already exists, please choose a different name!`
        );
      }
      const newTask = new Tasks(taskParams);
      return newTask.save();
    })
    .then((newTask) => {
      const t = taskPubView(newTask);

      res.status(201).send(t);
    })
    .catch((err) => {
      console.log(err);
      res.status(409).send(err.message);
    });
};

exports.putUpdateTask = (req, res, next) => {
  const taskName = req.params.id;

  Tasks.findOneAndUpdate({ name: taskName }, req.query)
    .then((task) => {
      if (task) {
        return res.status(200).send(taskPubView(task));
      }
      throw new Error(
        `Task ${taskName} not found! It is either deleted or invalid!`
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err.message);
    });
};

exports.getTask = (req, res, next) => {
  const taskName = req.params.id;
  Tasks.findOne({ name: taskName }).then((task) => {
    res.status(200).send( taskPubView(task) );
  });
};

exports.deleteTask = (req, res, next) => {
  // delete req body params task id
  const taskName = req.params.id;

  Tasks.deleteOne( { name: taskName })
  .then( () => {
    res.status(200).send(`Task Cleared ${taskName}`);
  })
};
