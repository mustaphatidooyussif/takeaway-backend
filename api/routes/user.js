const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const uploadUtility = require('../utility/upload');




// GET ALL USERS
router.get("/", checkAuth, UserController.user_get_all);
// GET USER BY USERID
router.get("/:userId", checkAuth, UserController.user_get_user);
// POST SIGNUP USER
router.post("/signup", uploadUtility.upload.single('photo'), UserController.user_create_user);
// POST LOGIN USER
router.post("/login", UserController.user_login_user);
//DELETE USER
router.delete("/:userId", checkAuth, UserController.user_delete_user);

module.exports = router;