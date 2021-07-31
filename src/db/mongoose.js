const mongoose = require('mongoose');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
require('dotenv').config({ path: `src/config/${envFile}` });
// Connection URL
const url = process.env.MONGODB_URL;

mongoose
  .connect(url, {
    useCreateIndex: true,
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
    // process.exit(1);
  });
