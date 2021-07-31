const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../src/models/user');

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

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneObjectId,
  userOne,
  setupDatabase,
};
