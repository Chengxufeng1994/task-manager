const express = require('express');
const taskController = require('../controllers/task');

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.readTasks);
router.get('/:taskId', taskController.readTask);
router.patch('/:taskId', taskController.updateTask);

module.exports = router;
