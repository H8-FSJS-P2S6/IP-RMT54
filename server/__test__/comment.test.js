const request = require("supertest");
const { Comment, sequelize } = require("../models");
const app = require("../app");
const {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");

// beforeAll(async () => {
//   await sequelize.sync({ force: true });
// });

// afterAll(async () => {
//     await Comment.destroy({ where: {}, truncate: true });
//   });

describe("CommentController", () => {
  let commentId;

  test("Create a new comment", async () => {
    const response = await request(app).post("/comments/").send({
      userId: 1,
      mal_id: 1,
      comment: "Great anime!",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', 1);
    expect(response.body).toHaveProperty('mal_id', 1);
    expect(response.body.comment).toBe("Great anime!");
    commentId = response.body.id;
  });

  test("Get all comments", async () => {
    const response = await request(app).get("/comments/");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(response.body.length);
  });

  test("Get a comment by ID", async () => {
    const response = await request(app).get(`/comments/${commentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", commentId);
    expect(response.body.comment).toBe("Great anime!");
  });

  test("Update a comment", async () => {
    const response = await request(app).put(`/comments/${commentId}`).send({
      userId: 1,
      mal_id: 1,
      comment: "Updated comment!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", commentId);
    expect(response.body.comment).toBe("Updated comment!");
  });

  test("Delete a comment", async () => {
    const response = await request(app).delete(`/comments/${commentId}`);

    expect(response.status).toBe(204);
  });

  test("Attempt to get deleted comment", async () => {
    const response = await request(app).get(`/comments/${commentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Comment not found" });
  });
});
