const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

beforeAll(async () => {
  let data = {
    userName:"admin123",
    email: "admin123@email.com",
    password: "admin123",
  };
  await User.create(data);
});

afterAll(async () => {
  await User.destroy({
    where: {},
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("Login: Let's check the status and response when", () => {
  test("Login is successful and an access token is returned", async () => {
    const response = await request(app).post("/login").send({
      email: "admin123@email.com",
      password: "admin123",
    });
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });

  test("No email is provided", async () => {
    const response = await request(app).post("/login").send({
      email: "",
      password: "admin123",
    });
    // console.log("🚀 ~ response ~ response:", response.body);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Email is required");
  });

  test("No password is provided", async () => {
    const response = await request(app).post("/login").send({
      email: "admin123@email.com",
      password: "",
    });
    // console.log("🚀 ~ response ~ response:", response.body);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Password is required");
  });

  test("The provided email is invalid or not registered", async () => {
    const response = await request(app).post("/login").send({
      email: "admin1234@email.com",
      password: "admin123",
    });
    // console.log("🚀 ~ response ~ response:", response.body);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  test("The password provided is incorrect or does not match", async () => {
    const response = await request(app).post("/login").send({
      email: "admin123@email.com",
      password: "admin12",
    });
    // console.log("🚀 ~ response ~ response:", response.body);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });
});

describe("Registration: Let's check the status and response when", () => {
  test("Registration is successful and a user is created", async () => {
    const response = await request(app).post("/register").send({
      userName:"new",
      email: "newuser@email.com",
      password: "newpassword",
    });
    console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: `newuser@email.com`,
      })
    );
  });

  test("Email is not provided", async () => {
    const response = await request(app).post("/register").send({
      userName:"new",
      email: "",
      password: "newpassword",
    });
    // console.log("🚀 ~ response ~ response:", response.body);

    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("Email is required");
  });

  test("Password is not provided", async () => {
    const response = await request(app).post("/register").send({
      userName: "new",
      email: "newuser@email.com",
      password: "",
    });
    console.log("🚀 ~ response ~ response:", response.body);

    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("Password is required");
  });

  test("User Name is not provided", async () => {
    const response = await request(app).post("/register").send({
      userName: "",
      email: "newuser@email.com",
      password: "new",
    });
    console.log("🚀 ~ response ~ response:", response.body);

    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("User Name is required");
  });

  test("Email is already in use", async () => {
    const response = await request(app).post("/register").send({
      userName: "new",
      email: "admin123@email.com",
      password: "admin123",
    });
    // console.log("🚀 ~ response ~ response:", response.body);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      "Email has already been used by another User"
    );
  });
});

