const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const uploadUtility = require('../utility/upload');




// GET ALL USERS
router.get("/", UserController.getAllUsers);
// GET USER BY USERID
router.get("/:userId", UserController.findSingleUser);
// // POST SIGNUP USER
// router.post("/signup", uploadUtility.upload.single('photo'), UserController.user_create_user);
router.post("/signup",  UserController.signUpUser);
// // POST LOGIN USER
// router.post("/login", UserController.user_login_user);
// //DELETE USER
router.delete("/:userId", UserController.deleteUser);

module.exports = router;