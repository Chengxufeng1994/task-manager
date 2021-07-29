const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
  name: 'Mike',
  email: 'mike@task.com',
  password: 'Red12345!',
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

describe('user test', () => {
  test('should signup a new user', async () => {
    await request(app)
      .post('/api/users')
      .send({
        name: 'benny',
        email: 'benny12628@task.com',
        password: 'Red12345!',
      })
      .expect(201);
  });

  test('should login existing user', async () => {
    await request(app)
      .post('/auth/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);
  });

  test('should login noExisting user', async () => {
    await request(app)
      .post('/auth/login')
      .send({
        email: userOne.email,
        password: 'qwertyuiop',
      })
      .expect(400);
  });
});
