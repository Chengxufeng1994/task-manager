const Task = require('../models/task');

const createTask = async (req, res) => {
  const { user, body } = req;
  // const { description, completed } = body;
  const task = new Task({
    ...body,
    // eslint-disable-next-line no-underscore-dangle
    owner: user._id,
  });

  try {
    const result = await task.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
// GET /api/tasks?complete=true
// GET /api/tasks?limit=10&skip=20
// GET /api?sortBy=createdAt:desc
const readTasks = async (req, res) => {
  const { user, query } = req;
  const { completed, limit, skip, sortBy } = query;

  const match = {};
  if (completed) {
    match.completed = completed === 'true';
  }

  const sort = {};
  if (sortBy) {
    const [field, desc] = sortBy.split(':');
    sort[field] = desc === 'desc' ? 1 : -1;
  }

  const options = {
    limit: parseInt(limit, 10),
    skip: parseInt(limit, 10) * parseInt(skip, 10),
    sort,
  };

  try {
    // eslint-disable-next-line no-underscore-dangle
    // const tasks = await Task.find({ owner: user._id });
    /**
     * * Populate Query conditions and other options
     * * https://mongoosejs.com/docs/populate.html#query-conditions
     */
    await user
      .populate({
        path: 'tasks',
        match,
        options,
      })
      .execPopulate();
    res.status(201).json(user.tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

const readTask = async (req, res) => {
  const { user, params } = req;
  const { taskId } = params;

  try {
    // eslint-disable-next-line no-underscore-dangle
    const task = await Task.findOne({ _id: taskId, owner: user._id });
    if (!task) {
      return res.status(404).json();
    }

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTask = async (req, res) => {
  const { user, body, params } = req;
  const { taskId } = params;

  const updateKeys = Object.keys(body);
  const allowUpdates = ['description', 'completed'];
  const isValidOperation = updateKeys.every((key) =>
    allowUpdates.includes(key),
  );

  if (!isValidOperation) {
    return res.status(400).json({
      error: 'Invalid updates',
    });
  }

  try {
    // const task = await Task.findOneAndUpdate(taskId, body, {
    //   new: true,
    //   runValidators: true,
    // });

    // eslint-disable-next-line no-underscore-dangle
    const task = await Task.findOne({ _id: taskId, owner: user._id });
    if (!task) {
      return res.status(404).json();
    }

    updateKeys.forEach((updateKey) => {
      task[updateKey] = body[updateKey];
    });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTask = async (req, res) => {
  const { user, params } = req;
  const { taskId } = params;
  try {
    // eslint-disable-next-line no-underscore-dangle
    const task = await Task.findOneAndDelete({ _id: taskId, owner: user._id });
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
  updateTask,
  deleteTask,
};
