const express = require("express");
const Controller = require("./controllers/controller");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/register",Controller.register);
app.post("/login",Controller.login);

app.use(authentication)
app.post("/addFavorite",Controller.addFavorite)

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
