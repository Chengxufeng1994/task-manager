const User = require('../models/user');

const createUser = async (req, res) => {
  const { body } = req;
  const user = new User(body);

  try {
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const readUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const readUser = async (req, res) => {
  const { params } = req;
  const { userId } = params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json();
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  readUsers,
  readUser,
};
