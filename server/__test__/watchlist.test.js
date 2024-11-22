const request = require('supertest');
const app = require('../app'); 
const { Watchlist } = require('../models');
const {
    test,
    expect,
    beforeEach,
    describe,
  } = require("@jest/globals");

describe('Watchlist Controller', () => {
//   beforeEach(async () => {
//     await Watchlist.destroy({ where: {} }); 
//   });

  test('should create a watchlist', async () => {
    const response = await request(app)
      .post('/watchlists')
      .send({ userId: 1, mal_id: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', 1);
    expect(response.body).toHaveProperty('mal_id', 1);
  });

  test('should retrieve all watchlists', async () => {
    await Watchlist.create({ userId: 1, mal_id: 1 });
    const response = await request(app).get('/watchlists');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('should retrieve a watchlist by id', async () => {
    const watchlist = await Watchlist.create({ userId: 1, mal_id: 1 });
    const response = await request(app).get(`/watchlists/${watchlist.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', 1);
  });

  test('should update a watchlist', async () => {
    const watchlist = await Watchlist.create({ userId: 1, mal_id: 1 });
    const response = await request(app)
      .put(`/watchlists/${watchlist.id}`)
      .send({ userId: 2, mal_id: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', 2);
  });

  test('should delete a watchlist', async () => {
    const watchlist = await Watchlist.create({ userId: 1, mal_id: 1 });
    const response = await request(app).delete(`/watchlists/${watchlist.id}`);

    expect(response.status).toBe(204);

    const deletedResponse = await request(app).get(`/watchlists/${watchlist.id}`);
    expect(deletedResponse.status).toBe(404);
  });
});
