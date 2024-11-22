const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  const bearerToken = req.headers.authorization;
  // console.log(bearerToken);
  if (!bearerToken) {
    next({ name: "JsonWebTokenError" });
    return;
  }

  const token = bearerToken.split(" ")[1];
  // console.log(token);
  
  if (!token) {
    next({ name: "JsonWebTokenError" });
    return;
  }
  //console.log(token);

  try {
    let data = verifyToken(token);
    // console.log(data);
    let user = await User.findByPk(data.UserId);
    if (!user) {
      next({ name: "JsonWebTokenError" });
      return;
    }
    // console.log(user);

    req.user = user;
    next();
  } catch (error) {
    console.log("🚀 ~ authentication ~ error:", error);
    next(error);
  }
  //   console.log("🚀 ~ authentication ~ req.headers:", req.headers);
}

module.exports = authentication;
