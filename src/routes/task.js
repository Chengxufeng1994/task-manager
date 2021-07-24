const express = require('express');
const taskController = require('../controllers/task');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/', isAuth, taskController.createTask);
router.get('/', taskController.readTasks);
router.get('/:taskId', taskController.readTask);
router.patch('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
