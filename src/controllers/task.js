const Task = require('../models/task');

const createTask = async (req, res) => {
  const { body } = req;
  const task = new Task(body);

  try {
    const result = await task.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const readTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

const readTask = async (req, res) => {
  const { params } = req;
  const { taskId } = params;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json();
    }

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createTask,
  readTasks,
  readTask,
};
