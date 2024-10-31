const router = require("express").Router()
const WatchlistController = require('../controller/watchlistController');

router.post('/', WatchlistController.createWatchlist);
router.get('/', WatchlistController.getWatchlists);
router.get('/:id', WatchlistController.getWatchlistById);
router.get('/watchlist/:userId', WatchlistController.getWatchlistByUserId);
router.put('/:id', WatchlistController.updateWatchlist);
router.delete('/:id', WatchlistController.deleteWatchlist);

module.exports = router;
