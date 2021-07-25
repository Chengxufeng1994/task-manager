const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const TaskSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Task = model('Task', TaskSchema);

module.exports = Task;
