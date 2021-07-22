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

module.exports = {
  createUser,
};
