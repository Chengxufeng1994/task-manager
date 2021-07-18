const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();
app.use(morgan('tiny'));

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`[Task Manager Api running at http://${HOST}:${PORT}]`);
});
