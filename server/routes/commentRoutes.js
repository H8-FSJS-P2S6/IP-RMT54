const router = require("express").Router()
const CommentController = require('../controller/commentController');

router.post('/', CommentController.create); 
router.get('/', CommentController.findAll); 
router.get('/:id', CommentController.findOne); 
router.put('/:id', CommentController.update); 
router.delete('/:id', CommentController.delete); 

module.exports = router;
