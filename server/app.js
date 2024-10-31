if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
var cors = require('cors')

// comment for testing
const PORT = process.env.PORT || 3000;
app.use(cors())

const { authentication } = require("./middlewares/autohentication");
const errorHandler = require("./middlewares/errorHandler");
const Controller = require("./controller/homeController");
const userRouter = require('./routes/userRoute')
const commentRouter = require('./routes/commentRoutes')
const likeRouter = require('./routes/likeRoute')
const watchlistRouter = require('./routes/watchlistRoute')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', Controller.welcomePage)

//User
app.use('/', userRouter)
app.use(authentication)
app.use('/comments', commentRouter);
app.use('/likes', likeRouter);
app.use('/watchlist', watchlistRouter)

//error handler
app.use(errorHandler)

module.exports = app;
