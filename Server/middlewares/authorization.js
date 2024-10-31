const { Favorite } = require("../models");

async function updateDelete(req, res, next) {
  let user = req.user;
  //   console.log(req.params);

  // console.log("Request Params:", req.params);
  // console.log("User from req:", user);

  if (!user) {
    return next("JsonWebTokenError");
  }

  try {
    const { pokemonName } = req.params;
    const fav = await Favorite.findOne({ where: {pokemonName,UserId:user.id} });

    if (!fav) {
      return next({ name: `NotFound`, message: "Pokemon Not Found" });
    }

    if (fav.UserId === user.id) {
      return next();
    } else {
      return next({
        name: "Forbidden",
        message: "Your are not Authorized",
      });
    }
  } catch (error) {
    console.error("Authorization error:", error);
    next(error);
  }
}

async function admin(req, res, next) {
  let user = req.user;
  //   console.log(req.params);

  // console.log("Request Params:", req.params);
  // console.log("User from req:", user);

  try {
    if (user.role !== "admin") {
      return next({
        name: "Forbidden",
        message: "Your are not Authorized",
      });
    }else{
      next()
    }
  } catch (error) {
    console.error("Authorization error:", error);
    next(error);
  }
}
module.exports = { updateDelete,admin };
