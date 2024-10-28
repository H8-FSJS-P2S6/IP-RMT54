const { User } = require("../models");

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
}
module.exports = Controller;
