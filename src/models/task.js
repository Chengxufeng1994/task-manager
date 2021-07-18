const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const TaskSchema = new Schema({
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const Task = model('Task', TaskSchema);

module.exports = Task;
