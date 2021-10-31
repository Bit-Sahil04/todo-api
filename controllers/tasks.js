const Tasks = require("../models/tasks");
const User = require("../models/user");

// only expose desired properties to the user
const taskPubView = (task) => {
  return {
    name: task.name,
    desc: task.desc,
    priority: task.priority,
    createdAt: task.createdOn,
    updatedAt: task.updatedOn,
    deadLine: task.deadLine,
  };
};

exports.getTasks = (req, res, next) => {
  // req.user
  User.findById(req.user._id)
    .populate("tasks.taskId").exec()
    .then((user) => {
      
      const tasks = user.tasks;
      console.log( tasks);
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
  const taskParams = req.query || req.body;
  let newTask;

  if (!taskParams.name || !taskParams.desc)
    return res
      .status(400)
      .send(
        `Missing required argument <${!taskParams.name ? "name" : "desc"} > !!`
      );

  req.user
    .populate("tasks")
    .then((user) => {
      const task = user.tasks.find((t) => t.name === taskParams.name);
      if (task > 0) {
        throw new Error(
          `Task ${taskParams.name} already exists, please choose a different name!`
        );
      }
      newTask = new Tasks({ ...taskParams, _user: user._id });
      req.user.tasks.push(newTask._id);

      return req.user.save();
    })
    .then(() => req.user.save())
    .then(() => {
      const t = taskPubView(newTask);
      console.log( req.user);

      res.status(201).send(t);
    })
    .catch((err) => {
      console.log(err);
      res.status(409).send(err.message);
    });
};

exports.putUpdateTask = (req, res, next) => {
  const taskName = req.params.id;
  console.log(req.query);

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
    res.status(200).send(taskPubView(task));
  });
};

exports.deleteTask = (req, res, next) => {
  // delete req body params task id
  const taskName = req.params.id;

  Tasks.deleteOne({ name: taskName }).then(() => {
    res.status(200).send(`Task Cleared ${taskName}`);
  });
};
