const request = require("supertest");
const app = require("../app");
const { User, Favorite } = require("../models");
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
  console.log(token, "<<<<<<<<<<");

  let favorite = [
    {
      UserId: 1,
      PokemonId: 1,
    },
    {
      UserId: 2,
      PokemonId: 1,
    },
  ];
  await Favorite.bulkCreate(favorite);
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
});

describe("Favorite: Let's check the status and response when", () => {
  test("Add Favorite is successful", async () => {
    const response = await request(app)
      .post("/favorites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        UserId: 1,
        PokemonId: 2,
      });
    console.log("🚀 ~ test ~ response:", response.body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        UserId: 1,
        PokemonId: 2,
      })
    );
  });

  test("Add Favorite is failed because Token is not sended/wrong", async () => {
    const response = await request(app).post("/favorites").send({
      UserId: 1,
      PokemonId: 2,
    });
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });

  test("Delete Favorite is successful", async () => {
    const response = await request(app)
      .delete("/favorites/3/delete")
      .set("Authorization", `Bearer ${token}`);
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        PokemonId: 2,
        UserId: 1,
      })
    );
  });

  test("Delete Favorite is failed because Token is not sended/wrong", async () => {
    const response = await request(app).delete("/favorites/1/delete");
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });

  test("Patch Favorite is successful", async () => {
    const response = await request(app)
      .patch("/favorites/1/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nickname: `tikus listrik`
      });
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        nickname: `tikus listrik`
      })
    );
  });

  test("Patch Favorite is failed because Token is not sended/wrong", async () => {
    const response = await request(app).patch("/favorites/1/update").send({
      nickname: `tikus listrik`,
      funFact: `can turn on tv for you with his electricity`,
    });
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });

  test("Patch Favorite is failed user is not authorized", async () => {
    const response = await request(app)
      .patch("/favorites/1/update")
      .set("Authorization", `Bearer ${token2}`)
      .send({
        nickname: `tikus listrik`,
        funFact: `can turn on tv for you with his electricity`,
      });
    console.log("🚀 ~ response ~ response:", response.body);
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Your are not Authorized");
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
      .set("Authorization", `Bearer ${token}`).send({
        userName:"admin2"
      });
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        userName: "admin2",
      })
    );
  });

  test("Patch user failed because Token is not sended/wrong", async () => {
    const response = await request(app)
      .patch("/users")
      .send({
        userName: "admin2",
      });
    // console.log("🚀 ~ response ~ response:", response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });
});
