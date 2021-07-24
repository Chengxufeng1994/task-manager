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

const logout = async (req, res) => {
  const { user, token: tokenReq } = req;
  try {
    user.tokens = user.tokens.filter((token) => token.token !== tokenReq);
    await user.save();

    res.status(200).json();
  } catch (error) {
    res.status(500).json();
  }
};

const logoutAll = async (req, res) => {
  const { user } = req;

  try {
    user.tokens = [];
    await user.save();

    res.status(200).json();
  } catch (error) {
    res.status(500).json();
  }
};

module.exports = {
  login,
  logout,
  logoutAll,
};
