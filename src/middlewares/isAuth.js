const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAuth = async (req, res, next) => {
  const { headers } = req;
  const { authorization } = headers;

  if (!authorization) {
    return res.status(401).json({
      error: 'Please provide authorization.',
    });
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'jwtsecret');
    const { _id } = decoded;
    const user = await User.findOne({ _id, 'tokens.token': token });

    if (!user) {
      throw new Error('User not found');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Please authenticate.',
    });
  }
};

module.exports = isAuth;
