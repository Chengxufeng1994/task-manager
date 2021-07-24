const express = require('express');
const taskController = require('../controllers/task');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/', isAuth, taskController.createTask);
router.get('/', isAuth, taskController.readTasks);
router.get('/:taskId', isAuth, taskController.readTask);
router.patch('/:taskId', isAuth, taskController.updateTask);
router.delete('/:taskId', isAuth, taskController.deleteTask);

module.exports = router;
