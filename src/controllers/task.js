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

module.exports = {
  createTask,
};
