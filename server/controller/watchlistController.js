const { Watchlist } = require('../models');

class WatchlistController {
  // CREATE
  static async createWatchlist(req, res, next) {
    try {
      const watchlist = await Watchlist.create(req.body);
      res.status(201).json(watchlist);
    } catch (error) {
      next(error);
    }
  }

  // READ (all)
  static async getWatchlists(req, res, next) {
    try {
      const watchlists = await Watchlist.findAll();
      res.status(200).json(watchlists);
    } catch (error) {
      next(error);
    }
  }

  // READ (by id)
  static async getWatchlistById(req, res, next) {
    try {
      const watchlist = await Watchlist.findByPk(req.params.id);
      if (!watchlist) throw { name: 'NotFound', message: 'Watchlist not found' };
      res.status(200).json(watchlist);
    } catch (error) {
      next(error);
    }
  }

  //// READ (by userId)
  static async getWatchlistByUserId(req, res, next) {
    try {
      const { userId } = req.params; // Get userId from request parameters
      const watchlists = await Watchlist.findAll({
        where: { userId: userId },
      });
      if (watchlists.length === 0) throw { name: 'NotFound', message: 'No watchlists found for this user' };
      res.status(200).json(watchlists);
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateWatchlist(req, res, next) {
    try {
      const [updated] = await Watchlist.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) throw { name: 'NotFound', message: 'Watchlist not found' };
      const updatedWatchlist = await Watchlist.findByPk(req.params.id);
      res.status(200).json(updatedWatchlist);
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteWatchlist(req, res, next) {
    try {
      const deleted = await Watchlist.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) throw { name: 'NotFound', message: 'Watchlist not found' };
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WatchlistController;
