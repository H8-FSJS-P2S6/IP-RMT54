const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const newUser = await User.create({
        username,
        email,
        password,
      });
      if (!newUser) next({ name: "BadRequest", message: "cant be empty" });
      res.status(201).json({
        message: "Register Success",
        username: newUser.username,
        email: newUser.email
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        next({ name: "BadRequest", message: "Invalid Email" });
        return;
      }
      if (!password) {
        next({ name: "BadRequest", message: "Invalid Password" });
        return;
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        next({ name: "Unauthorized", message: "Invalid email" });
        return;
      }

      // console.log('Input Password:', password);
      // console.log('Stored Password:', user.password);

      const validatePassword = await bcrypt.compare(password, user.password);

      // console.log(validatePassword)
      // console.log(bcrypt.getRounds(user.password))

      if (!validatePassword) {
        next({ name: "Unauthorized", message: "Invalid email/password" });
        return;
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
