const User = require('../models/user');

const login = async (req, res) => {
  const { body } = req;

  try {
    const { email, password } = body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json();
  }
};

module.exports = {
  login,
};
