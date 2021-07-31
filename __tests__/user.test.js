const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneObjectId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

describe('user test', () => {
  test('should signup a new user', async () => {
    const response = await request(app).post('/api/users').send({
      name: 'benny',
      email: 'benny12628@task.com',
      password: 'Red12345!',
    });
    // Assert that database was changed correctly
    const { status, body } = response;
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findById(body.user._id);
    expect(user).not.toBeNull();
    // Assert about the response
    expect(status).toEqual(201);
    expect(body).toMatchObject({
      user: {
        name: 'benny',
        email: 'benny12628@task.com',
      },
      token: user.tokens[0].token,
    });
    expect(user.password).not.toBe('Red12345!');
  });

  test('should login existing user', async () => {
    const response = await request(app).post('/auth/login').send({
      email: userOne.email,
      password: userOne.password,
    });

    const { status, body } = response;
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findById(body.user._id);
    expect(user).not.toBeNull();
    // Assert about the response
    expect(status).toEqual(200);
    // Assert that token in response matches users second token
    expect(user.tokens.length).toBe(2);
    expect(body.token).toEqual(user.tokens[1].token);
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

    const { status, body } = await result;
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findById(body._id);
    expect(status).toBe(201);
    expect(user).toBeNull();
  });

  test('should not delete account for unauthenticated user', async () => {
    const result = await request(app).delete('/api/users/me').send();

    const { status } = await result;
    expect(status).toBe(401);
  });

  test('should upload avatar image', async () => {
    const avatarPath = `${__dirname}/fixtures/profile-pic.jpg`;

    const response = await request(app)
      .post('/api/users/me/avatar')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .attach('avatar', avatarPath);

    const { status } = response;
    expect(status).toBe(200);

    // eslint-disable-next-line no-underscore-dangle
    const user = User.findById(userOne._id);
    expect(user.avatar).toEqual(expect.any.Buffer);
  });

  test('should update valid user fields', async () => {
    const response = await request(app)
      .patch('/api/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        age: 27,
      });

    const { status, body } = response;
    expect(status).toBe(201);
    expect(body.user.age).toEqual(27);
  });

  test('should not update invalid user fields', async () => {
    const response = await request(app)
      .patch('/api/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        location: 'taiwan',
      });

    const { status, body } = response;
    expect(status).toBe(400);
    expect(body.error).toEqual('Invalid updates');
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
