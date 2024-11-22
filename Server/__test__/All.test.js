const request = require("supertest");
const app = require("../app");
const { User, Favorite, Profile } = require("../models");
const bcrypt = require("bcrypt");

let token = "";
let token2 = "";
beforeAll(async () => {
  let data = [
    {
      userName: "admin123",
      email: "admin123@email.com",
      password: await bcrypt.hash("admin123", 10),
    },
    {
      userName: "admin1234",
      email: "admin1234@email.com",
      password: await bcrypt.hash("admin123", 10),
    },
  ];
  await User.bulkCreate(data);
  //   console.log(user);

  const response = await request(app).post("/login").send({
    email: "admin123@email.com",
    password: "admin123",
  });

  const response2 = await request(app).post("/login").send({
    email: "admin1234@email.com",
    password: "admin123",
  });

  token = response.body.access_token;
  token2 = response2.body.access_token;
  // console.log(response.body,"<<<<<<<<<<<<<<<<<<<<<<<<<");
  // console.log(token, "<<<<<<<<<<");

  let favorite = [
    {
      UserId: 1,
      pokemonName: "Pikachu",
    },
    {
      UserId: 2,
      pokemonName: "Bulbasaur",
    },
  ];
  await Favorite.bulkCreate(favorite);

  let pictures = [
    {
      imgUrl: "pict1",
    },
    {
      imgUrl: "pict2",
    },
  ];
  await Profile.bulkCreate(pictures);
});

afterAll(async () => {
  await User.destroy({
    where: {},
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await Favorite.destroy({
    where: {},
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await Profile.destroy({
    where: {},
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("Favorite: Let's check the status and response when", () => {
  test("Add Favorite is successful", async () => {
    const response = await request(app)
      .post("/favorites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        UserId: 1,
        pokemonName: "Bulbasaur",
      });
    // console.log("🚀 ~ test ~ response:", response.body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        UserId: 1,
        pokemonName: "Bulbasaur",
      })
    );
  });

  test("Add Favorite is failed because Token is not sended/wrong", async () => {
    const response = await request(app).post("/favorites").send({
      UserId: 1,
      pokemonName: "Bulbasaur",
    });
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });

  test("Delete Favorite is successful", async () => {
    const response = await request(app)
      .delete("/favorites/Pikachu")
      .set("Authorization", `Bearer ${token}`);
    // console.log("🚀 ~ response ~ response:<<<<<<<<<<<<<<", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        pokemonName: "Pikachu",
        UserId: 1,
      })
    );
  });

  test("Delete Favorite is failed because Token is not sended/wrong", async () => {
    const response = await request(app).delete("/favorites/Bulbasaur");
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });
});

describe("User: Let's check the status and response when", () => {
  test("Get user successful", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        userName: "admin123",
      })
    );
  });

  test("Get user failed because Token is not sended/wrong", async () => {
    const response = await request(app).get("/users");
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });

  test("Patch user successful", async () => {
    const response = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userName: "admin2",
        ProfileId: 1,
      });
    // console.log("🚀 ~ response ~ response:<<<<<<<<<<<<<<<", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        userName: "admin2",
        ProfileId: 1,
      })
    );
  });

  test("Patch user failed because Token is not sended/wrong", async () => {
    const response = await request(app).patch("/users").send({
      userName: "admin2",
    });
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });
});


describe("Profile: Let's check the status and response when", () => {
  test("Get Profile is successful", async () => {
    const response = await request(app)
      .get("/profiles")
      .set("Authorization", `Bearer ${token}`);
    // console.log("🚀 ~ response ~ response:>>>>>>>>>", response.body);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Get Profile failed because Token is not sended/wrong", async () => {
    const response = await request(app)
      .get("/profiles")
    // console.log("🚀 ~ response ~ response:>>>>>>>>>", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });
});
