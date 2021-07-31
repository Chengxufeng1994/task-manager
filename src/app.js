require('./db/mongoose');

const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const app = express();

// const fileStorage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'avatars');
//   },
//   filename(req, file, cb) {
//     cb(null, `${new Date().toISOString()}-${file.originalname}`);
//   },
// });
const fileFilter = function (req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  // if (!file.originalname.match(/\.(doc|docx)/)) {
  //   cb(new Error('Please upload a word document'), false);
  // }

  if (file.originalname.match(/\.(png|jpg|jpeg)/)) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file pass `false`, like so:
    cb(new Error('Please upload a image'), false);
  }
  // You can always pass an error if something goes wrong:
  // cb(new Error("I don't have a clue!"));
};

app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(
  multer({
    // storage: fileStorage,
    fileFilter,
    limits: {
      fileSize: 1024 * 1000,
    },
  }).single('avatar'),
);

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(400).json({
    error: error.message,
  });
});

/**
 * * http status
 * * https://httpstatuses.com
 */

/**
 * * Without middleware: new request => run route handler
 * * With middleware: new request => do some stuff => run route handler;
 */

module.exports = app;

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//   const task = await Task.findById('60fc314dea4c8a2f40cd6bca');
//   await task.populate('owner').execPopulate();
//   console.log(task);
//   const user = await User.findById('60fc29529ce8c324560027af');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };

// main();
