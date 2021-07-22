require('./db/mongoose');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

/**
 * * http status
 * * https://httpstatuses.com
 */

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`[Task Manager API running at http://${HOST}:${PORT}]`);
});
