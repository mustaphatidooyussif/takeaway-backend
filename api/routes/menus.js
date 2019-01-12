const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const menusController = require('../controllers/menus');

// GET: GET ALL MENU
router.get('/', menusController.menus_get_all);
// POST: CREATE A MENU
router.post('/', checkAuth, menusController.menus_create_menu);
// GET: GET A SINGLE MENU
router.get('/:menuId', menusController.menus_get_menu);
// PATCH: UPDATE A SINGLE MENU
router.patch('/:menuId', checkAuth, menusController.menus_update_menu);
// DELETE: DELETE A SINGLE MENU
router.delete('/:menuId', checkAuth, menusController.menus_delete_menu);

module.exports = router;