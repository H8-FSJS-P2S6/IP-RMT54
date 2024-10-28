const { compareSync } = require("bcrypt");
const { User,Favorite } = require("../models");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });

      const userResponse = user.get({ plain: true });
      delete userResponse.password;

      res.status(201).json(userResponse);
    } catch (error) {
      console.log("🚀 ~ Controller ~ register ~ error:", error);
      next(error);
    }
  }
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        next({ name: "BadReq", message: `Email is required` });
        return;
      }
      if (!password) {
        next({ name: "BadReq", message: `Password is required` });
        return;
      }

      const user = await User.findOne({ where:{email} });

      if (!user) {
        return next({
          name: `NotAuthorized`,
          message: `Invalid email or password`,
        });
      }

      const isValid = compareSync(password,user.password)

      if (!isValid) {
        return next({
          name: `NotAuthorized`,
          message: `Invalid email or password`,
        });
      }

      const access_token = signToken({ UserId: user.id });

      return res.status(200).json({ access_token:access_token });
    } catch (error) {
      console.log("🚀 ~ Controller ~ login ~ error:", error)
      next(error);
    }
  }

  static async addFavorite(req,res,next){
    const {PokemonId,funFact} = req.body
    try {
        const {id} = req.user
        const pokemonFav = await Favorite.create({PokemonId,UserId:id,funFact})
        
        res.status(201).json(pokemonFav)
    } catch (error) {
        console.log("🚀 ~ Controller ~ addFavorite ~ error:", error)
        next(error)
    }
  }
}
module.exports = Controller;
