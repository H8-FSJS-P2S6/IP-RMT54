const express = require("express");
const Controller = require("./controllers/controller");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const { updateDelete, admin } = require("./middlewares/authorization");
const cors = require("cors");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", Controller.register);
app.post("/login", Controller.login);
app.post("/googleLogin", Controller.googleLogin);

app.get("/favorites", authentication, Controller.getFavorite);
app.post("/favorites", authentication, Controller.addFavorite);

app.delete(
  "/favorites/:pokemonName",
  authentication,
  updateDelete,
  Controller.deleteFavorite
);

app.get("/users",authentication, Controller.getUser);
app.patch("/users",authentication, Controller.updateUser);

app.get("/profiles", authentication, Controller.getProfile);

const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
app.post("/profiles", authentication,admin,upload.single('imgUrl'), Controller.addProfile);

app.use(errorHandler);

module.exports = app;
