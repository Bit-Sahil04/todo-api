const express = require('express');
const taskController = require('../controllers/tasks');
const router = express.Router();
// const taskController = require('../controllers/tasks');

// GET /todos	List all todos of the current user
router.get('/todos', taskController.getTasks)

// POST /todos	Create a new todo item
router.post('/todos', taskController.postAddTask)

// PUT /todos/:id	Update an existing todo
router.put('/todos/:id', taskController.putUpdateTask)

// DELETE /todos/:id	Delete an existing todo
router.delete('/todos/:id', taskController.deleteTask)

// GET /todos/:id	Get a single todo
router.get('/todos/:id', taskController.getTask)


module.exports = router;