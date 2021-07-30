const jwt = require('jsonwebtoken');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneObjectId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneObjectId,
  name: 'Mike',
  email: 'mike@task.com',
  password: 'Red12345!',
  tokens: [
    {
      token: jwt.sign(
        { _id: userOneObjectId.toString() },
        process.env.JWT_SECRET,
      ),
    },
  ],
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

  test('should get profile for user', async () => {
    const result = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send();

    const { status } = await result;
    expect(status).toBe(201);
  });

  test('should not get profile for unauthenticated user', async () => {
    const result = await request(app).get('/api/users/me').send();

    const { status } = await result;
    expect(status).toBe(401);
  });

  test('should delete account for user', async () => {
    const result = await request(app)
      .delete('/api/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send();

    const { status } = await result;
    expect(status).toBe(201);
  });

  test('should not delete account for unauthenticated user', async () => {
    const result = await request(app).delete('/api/users/me').send();

    const { status } = await result;
    expect(status).toBe(401);
  });
});

describe('Testing with Authentication', () => {
  test('should', async () => {
    const decoded = await jwt.verify(
      userOne.tokens[0].token,
      process.env.JWT_SECRET,
    );
    // eslint-disable-next-line no-underscore-dangle
    expect(decoded._id).toEqual(userOneObjectId.toString());
  });
});
