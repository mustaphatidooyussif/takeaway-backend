const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const menusController = require('../controllers/menus');

// GET: GET ALL MENU
router.get('/', menusController.getAllMenus);
// POST: CREATE A MENU
router.post('/', menusController.createNewMenu);
// // GET: GET A SINGLE MENU
router.get('/:menuId', menusController.getMenu);
// // PATCH: UPDATE A SINGLE MENU
router.patch('/:menuId', menusController.EditMenu);
// // DELETE: DELETE A SINGLE MENU
router.delete('/:menuId', menusController.deleteMenu);

module.exports = router;