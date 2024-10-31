const { Comment } = require('../models');

class CommentController {
  static async create(req, res, next) {
    const { userId } = req.user
    const { comment } = req.body;
    const { mal_id } = req.query
    try {
      const newComment = await Comment.create({ userId, mal_id, comment }, {
        Headers: {
          Authorzation: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const comments = await Comment.findAll();
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { comment } = req.body;
    const { userId } = req.user
    const { mal_id } = req.query
    try {
      const [updated] = await Comment.update({ userId, mal_id, comment }, {
        where: { id },
      });
      if (!updated) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      const updatedComment = await Comment.findByPk(id);
      res.status(200).json(updatedComment);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deleted = await Comment.destroy({
        where: { id },
      });
      if (!deleted) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      const deletedComment = await Comment.findByPk(id);
      res.status(204).json(deletedComment);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CommentController;
