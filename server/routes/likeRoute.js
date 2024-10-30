const router = require("express").Router()
const likesController = require('../controller/likeController');

router.post('/', likesController.createLike);
router.get('/', likesController.getLikes);
router.get('/:id', likesController.getLikeById);
router.put('/:id', likesController.updateLike);
router.delete('/:id', likesController.deleteLike);

module.exports = router;
