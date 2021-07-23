const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const { model, Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate(value) {
      if (!isEmail(value)) {
        throw new Error('Email is inValid.');
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "Password".');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number.');
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  // eslint-disable-next-line no-underscore-dangle
  const token = await jwt.sign({ _id: user._id.toString() }, 'jwtsecret');
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

/** Hash the plain text password before saving */
UserSchema.pre('save', async function (next) {
  // console.log('[just before saving!]');
  const user = this;
  if (user.isModified('password')) {
    // console.log('[password is modified]');
    user.password = await bcryptjs.hash(user.password, 10);
  }

  next();
});

const User = model('User', UserSchema);

module.exports = User;
