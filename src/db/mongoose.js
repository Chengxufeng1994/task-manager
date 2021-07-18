const mongoose = require('mongoose');

const HOST = process.env.HOST || '127.0.0.1';
// Connection URL
const url = `mongodb://${HOST}:27017/task-manager-api`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connection success');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`MongoDB connection error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  });
