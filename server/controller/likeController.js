const { Like } = require('../models');

class LikesController {
  // CREATE
  static async createLike(req, res, next) {
    try {
      const like = await Like.create(req.body);
      res.status(201).json(like);
    } catch (error) {
      next(error);
    }
  }

  // READ (all)
  static async getLikes(req, res, next) {
    try {
      const likes = await Like.findAll();
      res.status(200).json(likes);
    } catch (error) {
      next(error);
    }
  }

  // READ (by id)
  static async getLikeById(req, res, next) {
    try {
      const like = await Like.findByPk(req.params.id);
      if (!like) throw { name: 'NotFound', message: 'Like not found' };
      res.status(200).json(like);
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateLike(req, res, next) {
    try {
      const [updated] = await Like.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) throw { name: 'NotFound', message: 'Like not found' };
      const updatedLike = await Like.findByPk(req.params.id);
      res.status(200).json(updatedLike);
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteLike(req, res, next) {
    try {
      const deleted = await Like.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) throw { name: 'NotFound', message: 'Like not found' };
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LikesController;
