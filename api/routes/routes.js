const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const uploadUtility = require('../utility/upload');
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');
const fooditemController = require('../controllers/fooditem');
const checkAuth = require('../middleware/check-auth');
const menusController = require('../controllers/menus');


// GET ALL USERS
router.get("/user", UserController.getAllUsers);
// GET USER BY USERID
router.get("/user/:userId", UserController.findSingleUser);
// // POST SIGNUP USER
// router.post("/signup", uploadUtility.upload.single('photo'), UserController.user_create_user);
router.post("/user/signup", uploadUtility.upload.single('photo'),  UserController.signUpUser);
// // POST LOGIN USER
router.post("/user/login", UserController.logInUser);
// //patch USER
router.patch("/user/:userId", checkAuth, UserController.EditUser);
// //DELETE USER
router.delete("/user/:userId", checkAuth, UserController.deleteUser);

//ORDERS
// Handle incoming GET requests to /orders
router.get("/orders/", OrdersController.getAllOrders);
// // POST /ORDERS: CREATE ORDER 
router.post("/orders/", checkAuth, OrdersController.createOrder);
// // GET /ORDERS/:ORDERID: GET A SINGLE ORDER
router.get("/orders/:orderId", OrdersController.getSingleOrder);
// // UPDATE /ORDERS/:ORDERID
router.patch("/orders/:orderId", checkAuth, OrdersController.updateOrder);
// // DELETE /ORDERS/ORDERID
router.delete("/orders/:orderId", checkAuth, OrdersController.deleteOrder);


// GET: GET ALL MENU
router.get('/menus/', menusController.getAllMenus);
// POST: CREATE A MENU
router.post('/menus/', checkAuth, menusController.createNewMenu);
// // GET: GET A SINGLE MENU
router.get('/menus/:menuId', menusController.getMenu);
// // PATCH: UPDATE A SINGLE MENU
router.patch('/menus/:menuId', checkAuth, menusController.EditMenu);
// // DELETE: DELETE A SINGLE MENU
router.delete('/menus/:menuId', checkAuth, menusController.deleteMenu);


//FOOD ITEMS
// GET: ALL FOOD ITEMS
router.get('/food/', fooditemController.getAllFoodItems);
// POST: CREATE FOOD ITEM
router.post('/food/',checkAuth, fooditemController.createNewFoodItem);
// // GET: GET A SINGLE FOOD ITEM
router.get('/food/:itemId', fooditemController.getFoodItem);
// //PATCH: UPDATE A FOOD ITEM
router.patch('/food/:itemId', checkAuth, fooditemController.EditFoodItem);
// // DELETE: DELETE A FOOD ITEM
router.delete('/food/:itemId', checkAuth, fooditemController.deleteFoodItem);

//CAFETERIAS
// GET:  GET ALL CAFETERIAS
router.get('/cafeterias/', cafeteriaController.getAllCafeterias);
// POST: CREATE A CAFETERIA
router.post('/cafeterias/', checkAuth, cafeteriaController.createNewCafeteria);
// // GET: GET A SINGLE CAFETERIA
router.get('/cafeterias/:cafeteriaId', cafeteriaController.findSingleCafeteria);
// // PATCH: UPDATE A SINGLE CAFETERIA
router.patch('/cafeterias/:cafeteriaId', checkAuth, cafeteriaController.EditCafeteria);
// // DALETE: DELETE A SINGLE CAFETERIA
router.delete('/cafeterias/:cafeteriaId', checkAuth, cafeteriaController.deleteCafeteria);

module.exports = router;