/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneObjectId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneObjectId,
  name: 'Mike',
  email: 'mike@task.com',
  password: 'Red12345!',
  tokens: [
    {
      token: jwt.sign(
        { _id: userOneObjectId.toString() },
        process.env.JWT_SECRET,
      ),
    },
  ],
};

const useTwoObjectId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: useTwoObjectId,
  name: 'Brain',
  email: 'brain@task.com',
  password: 'myHouse099@@',
  tokens: [
    {
      token: jwt.sign(
        { _id: useTwoObjectId.toString() },
        process.env.JWT_SECRET,
      ),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'first task',
  completed: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'second task',
  completed: true,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'third task',
  completed: true,
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneObjectId,
  userOne,
  useTwoObjectId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
