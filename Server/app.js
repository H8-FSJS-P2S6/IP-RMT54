const express = require("express");
const Controller = require("./controllers/controller");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const { updateDelete } = require("./middlewares/authorization");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", Controller.register);
app.post("/login", Controller.login);

app.get("/favorites", authentication, Controller.getFavorite);
app.post("/favorites", authentication, Controller.addFavorite);

app.delete(
  "/favorites/:id/delete",
  authentication,
  updateDelete,
  Controller.deleteFavorite
);
app.patch(
  "/favorites/:id/update",
  authentication,
  updateDelete,
  Controller.updateFavorite
);

app.get("/user",authentication, Controller.getUser);

app.use(errorHandler);

module.exports = app;
