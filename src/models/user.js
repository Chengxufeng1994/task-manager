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
});

const User = model('User', UserSchema);

module.exports = User;
