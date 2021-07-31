const sharp = require('sharp');
const User = require('../models/user');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');

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
    sendWelcomeEmail(email, name);
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

    res.status(201).json({ user });
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
    sendCancelEmail(user.email, user.name);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const uploadAvatar = async (req, res) => {
  const { user, file } = req;
  const buffer = await sharp(file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  user.avatar = buffer;
  await user.save();

  res.status(200).json();
};

const deleteAvatar = async (req, res) => {
  const { user } = req;
  user.avatar = undefined;
  await user.save();

  res.status(200).json();
};

const getUserAvatarById = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findById(req.params.userId);
    if (!user || !user.avatar) {
      throw new Error('User not found');
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).json();
  }
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
  getUserAvatarById,
};
