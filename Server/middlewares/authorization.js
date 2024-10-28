const {Favorite} = require("../models");

async function updateDelete(req, res, next) {
  let user = req.user;
  //   console.log(req.params);

  // console.log("Request Params:", req.params);
  // console.log("User from req:", user);

  if (!user) {
    return next("JsonWebTokenError");
  }

  try {
    const {id} = req.params
    const fav = await Favorite.findByPk(id);

    if (!fav) {
      next({ name: `NotFound`, message: "Pokemon Not Found" });
    }

    if (fav.UserId === user.id) {
      return next();
    } else {
      return next({
        name: "Forbidden",
        message: "You can only modify your own products",
      });
    }
  } catch (error) {
    console.error("Authorization error:", error);
    next(error);
  }
}
module.exports = {updateDelete}