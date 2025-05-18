const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.get('/', taskController.getAllTodos);
router.post('/', taskController.createTodo);
router.put('/:id', taskController.updateTodo);
router.delete('/:id', taskController.deleteTodo);

module.exports = router;