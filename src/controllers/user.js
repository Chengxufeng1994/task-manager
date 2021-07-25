const User = require('../models/user');

const createUser = async (req, res) => {
  const { body } = req;
  const { name, email, password, ...rest } = body;
  const user = new User({
    name,
    email,
    password,
    ...rest,
  });

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

const readProfile = async (req, res) => {
  const { user } = req;

  res.status(201).json({ user });
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

const updateUser = async (req, res) => {
  const { body, params } = req;
  const { userId } = params;

  const updateKeys = Object.keys(body);
  const allowUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updateKeys.every((key) =>
    allowUpdates.includes(key),
  );

  if (!isValidOperation) {
    return res.status(400).json({
      error: 'Invalid updates',
    });
  }

  try {
    // const user = await User.findOneAndUpdate(userId, body, {
    //   new: true,
    //   runValidators: true,
    // });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json();
    }

    updateKeys.forEach((updateKey) => {
      user[updateKey] = body[updateKey];
    });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateProfile = async (req, res) => {
  const { user, body } = req;

  const updateKeys = Object.keys(body);
  const allowUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updateKeys.every((key) =>
    allowUpdates.includes(key),
  );

  if (!isValidOperation) {
    return res.status(400).json({
      error: 'Invalid updates',
    });
  }

  try {
    // const user = await User.findOneAndUpdate(userId, body, {
    //   new: true,
    //   runValidators: true,
    // });

    updateKeys.forEach((updateKey) => {
      user[updateKey] = body[updateKey];
    });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { params } = req;
  const { userId } = params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json();
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProfile = async (req, res) => {
  const { user } = req;

  try {
    await user.remove();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const uploadAvatar = async (req, res) => {
  const { user, file } = req;
  user.avatar = file.buffer;
  await user.save();

  res.status(200).json();
};

const deleteAvatar = async (req, res) => {
  const { user } = req;
  user.avatar = undefined;
  await user.save();

  res.status(200).json();
};

module.exports = {
  createUser,
  readProfile,
  readUsers,
  readUser,
  updateUser,
  updateProfile,
  deleteUser,
  deleteProfile,
  uploadAvatar,
  deleteAvatar,
};
