const express = require('express');
const taskController = require('../controllers/tasks');

const {checkAuth, test} = require('../middlewares/checkAuth');
const router = express.Router();
// const taskController = require('../controllers/tasks');

// GET /todos	List all todos of the current user
router.get('/todos', checkAuth, taskController.getTasks)

// POST /todos	Create a new todo item
router.post('/todos', checkAuth, taskController.postAddTask)

// PUT /todos/:id	Update an existing todo
router.put('/todos/:id',checkAuth,  taskController.putUpdateTask)

// DELETE /todos/:id	Delete an existing todo
router.delete('/todos/:id', checkAuth,  taskController.deleteTask)

// GET /todos/:id	Get a single todo
router.get('/todos/:id', checkAuth, taskController.getTask)


module.exports = router;