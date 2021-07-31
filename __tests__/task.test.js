const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

describe('Task Test', () => {
  test('should create task for user', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        description: 'task test',
      });

    const { status, body } = response;
    // eslint-disable-next-line no-underscore-dangle
    const task = await Task.findById(body._id);
    expect(status).toBe(201);
    expect(task).not.toBeNull();
    expect(task.completed).toBeFalsy();
  });
});
