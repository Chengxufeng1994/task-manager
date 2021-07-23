require('./db/mongoose');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/auth', authRoutes);
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

/**
const bcryptjsFunc = async () => {
  const password = 'qwertyuiop';
  const hashPassword = await bcryptjs.hash(password, 10);
  console.log('[password]: ', password);
  console.log('[hashPassword]: ', hashPassword);
  const isMatch = await bcryptjs.compare(password, hashPassword);
  console.log(isMatch);
};

bcryptjsFunc();
*/
