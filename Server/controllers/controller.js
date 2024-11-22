const { compareSync } = require("bcrypt");
const { User, Favorite, Profile } = require("../models");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, res, next) {
    const { email, password, userName } = req.body;
    try {
      const user = await User.create({
        email,
        password,
        userName,
        role: "user",
      });

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

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next({
          name: `NotAuthorized`,
          message: `Invalid email or password`,
        });
      }

      const isValid = compareSync(password, user.password);

      if (!isValid) {
        return next({
          name: `NotAuthorized`,
          message: `Invalid email or password`,
        });
      }

      const access_token = signToken({ UserId: user.id });

      return res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log("🚀 ~ Controller ~ login ~ error:", error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;

      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GoogleClientId, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          userName: payload.name,
          email: payload.email,
          password: "password-google",
        },
        hooks: false,
      });

      const access_token = signToken({ UserId: user.id });

      return res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log("🚀 ~ Controller ~ googleLogin ~ error:", error);
      next(error);
    }
  }

  static async addFavorite(req, res, next) {
    const { pokemonName } = req.body;
    try {
      const { id } = req.user;
      const pokemonFav = await Favorite.create({
        pokemonName,
        UserId: id,
      });

      res.status(201).json(pokemonFav);
    } catch (error) {
      console.log("🚀 ~ Controller ~ addFavorite ~ error:", error);
      next(error);
    }
  }

  static async deleteFavorite(req, res, next) {
    const { pokemonName } = req.params;
    try {
      console.log(pokemonName,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      const {id:UserId} = req.user
      
      const pokemonFav = await Favorite.findOne({where:{pokemonName,UserId},});
      if (!pokemonFav) {
        return next({
          name: `NotFound`,
          message: `Pokemon not found`,
        });
      }

      await Favorite.destroy({ where: { pokemonName, UserId } });

      res.status(200).json(pokemonFav);
    } catch (error) {
      console.log("🚀 ~ Controller ~ deleteFavorite ~ error:", error);
      next(error);
    }
  }

  static async getFavorite(req, res, next) {
    try {
      const user = req.user;
      const pokemonFav = await Favorite.findAll({ where: { UserId: user.id } });
      if (!pokemonFav) {
        return next({
          name: `NotFound`,
          message: `Pokemon not found`,
        });
      }

      res.status(200).json(pokemonFav);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getFavorite ~ error:", error);
      next(error);
    }
  }


  static async getUser(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        include: Profile,
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getUser ~ error:", error);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    const { ProfileId, userName } = req.body;
    try {
      const { id } = req.user;
      await User.update({ ProfileId, userName }, { where: { id } });
      const user = await User.findByPk(id, {
        include: Profile,
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getUser ~ error:", error);
      next(error);
    }
  }

  static async addProfile(req, res, next) {
    try {
      // console.log("🚀 ~ Controller ~ addProfile ~ file:", file)
      const cloudinary = require("cloudinary").v2;
      cloudinary.config({
        cloud_name: process.env.CloudinaryName,
        api_key: process.env.CloudinaryKey,
        api_secret: process.env.CloudinarySecret,
      });

      let mimeType = req.file.mimetype;
      let data = req.file.buffer.toString("base64");

      let response = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${data}`
      );
      // console.log(response,"<<<<<<<<<<<<");
      let imgUrl = response.secure_url;

      await Profile.create({ imgUrl });

      res.status(201).json("Added image succesfully!");
    } catch (error) {
      console.log("🚀 ~ Controller ~ addFavorite ~ error:", error);
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const profile = await Profile.findAll()

      return res.status(200).json(profile);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getUser ~ error:", error);
      next(error);
    }
  }
}
module.exports = Controller;
