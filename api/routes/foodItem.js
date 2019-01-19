const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const fooditemController = require('../controllers/fooditem');


// GET: ALL FOOD ITEMS
router.get('/', fooditemController.getAllFoodItems);
// POST: CREATE FOOD ITEM
router.post('/',checkAuth, fooditemController.createNewFoodItem);
// // GET: GET A SINGLE FOOD ITEM
router.get('/:itemId', fooditemController.getFoodItem);
// //PATCH: UPDATE A FOOD ITEM
router.patch('/:itemId', checkAuth, fooditemController.EditFoodItem);
// // DELETE: DELETE A FOOD ITEM
router.delete('/:itemId', checkAuth, fooditemController.deleteFoodItem);

module.exports = router;