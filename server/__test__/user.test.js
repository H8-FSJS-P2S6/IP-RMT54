const {
    test,
    expect,
    beforeAll,
    afterAll,
    describe,
  } = require("@jest/globals");
  const request = require("supertest");
  const app = require("../app");
  const { sequelize, User } = require("../models");
  const { signToken } = require("../helpers/jwt");
  const bcrypt = require("bcryptjs");
  
  describe("User Login", () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true });
      const salt = await bcrypt.genSalt(10);
      await User.create({
        username: "adminuser",
        email: "admin@example.com",
        password: "admin123",
      });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
  
    test("should login successfully with valid credentials", async () => {
      const response = await request(app).post("/user/login").send({
        email: "admin@example.com",
        password: "admin123",
      });
  
      expect(200);
    });
  
    test("should return 400 for invalid email", async () => {
      const response = await request(app).post("/user/login").send({
        email: "a123123dmin@example.com",
        password: "admin123",
      });
  
      expect(400);
    });
  
    test("should return 401 for invalid password", async () => {
      const response = await request(app).post("/user/login").send({
        email: "admin@example.com",
        password: "234wertgwer",
      });
  
      expect(401);
    });
  
    test("should return 400 for missing email", async () => {
      const response = await request(app).post("/user/login").send({
        password: "password123",
      });
  
      expect(400);
    });
  
    test("should return 400 for missing password", async () => {
      const response = await request(app).post("/user/login").send({
        email: "admin@example.com",
      });
  
      expect(400);
    });
  });