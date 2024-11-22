const router = require("express").Router()
const UserController = require("../controller/userController");

//Users
router.post('/register', UserController.register )
router.post('/login', UserController.login ) 
router.post('/google-login', UserController.googleLogin ) 

module.exports = router