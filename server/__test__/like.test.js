const request = require('supertest');
const app = require('../app'); 
const { Like, sequelize } = require('../models');
const {
    test,
    expect,
    beforeAll,
    afterAll,
    describe,
  } = require("@jest/globals");

// beforeEach(async () => {
//   await Like.destroy({ where: {} });
// });

describe('Likes Controller', () => {
  test('should create a like', async () => {
    const response = await request(app)
      .post('/likes')
      .send({ userId: 1, mal_id: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', 1);
    expect(response.body).toHaveProperty('mal_id', 1);
  });

  test('should retrieve all likes', async () => {
    await Like.create({ userId: 1, mal_id: 1 });
    const response = await request(app).get('/likes');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(response.body.length);
  });

  test('should retrieve a like by id', async () => {
    const like = await Like.create({ userId: 1, mal_id: 1 });
    const response = await request(app).get(`/likes/${like.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', 1);
  });

  test('should update a like', async () => {
    const like = await Like.create({ userId: 1, mal_id: 1 });
    const response = await request(app)
      .put(`/likes/${like.id}`)
      .send({ userId: 2, mal_id: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', 2);
  });

  test('should delete a like', async () => {
    const like = await Like.create({ userId: 1, mal_id: 1 });
    const response = await request(app).delete(`/likes/${like.id}`);

    expect(response.status).toBe(204);

    const deletedResponse = await request(app).get(`/likes/${like.id}`);
    expect(deletedResponse.status).toBe(404);
  });
});
