/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
  userOne,
  userTwo,
  taskOne,
  setupDatabase,
} = require('./__fixtures__/db');

jest.setTimeout(10000);

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

  test('should fetch userOne task', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send();
    const { status, body } = response;
    // eslint-disable-next-line no-underscore-dangle
    expect(status).toBe(201);
    expect(body.length).toEqual(2);
  });

  test('should return fail when userTwo delete userOne task', async () => {
    const response = await request(app)
      .delete(`/api/tasks/${taskOne._id}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send();
    const { status } = response;
    expect(status).toBe(404);
  });
});
