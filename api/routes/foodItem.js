const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const fooditemController = require('../controllers/fooditem');


// GET: ALL FOOD ITEMS
router.get('/', fooditemController.fooditem_get_all);
// POST: CREATE FOOD ITEM
router.post('/', checkAuth, fooditemController.fooditem_create_fooditem);
// GET: GET A SINGLE FOOD ITEM
router.get('/:itemId', fooditemController.fooditem_get_fooditem);
//PATCH: UPDATE A FOOD ITEM
router.patch('/:itemId', checkAuth, fooditemController.fooditem_update_fooditem);
// DELETE: DELETE A FOOD ITEM
router.delete('/:itemId', checkAuth, fooditemController.fooditem_delete_fooditem);

module.exports = router;