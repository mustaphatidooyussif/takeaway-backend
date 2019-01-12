const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const cafeteriaController = require('../controllers/cafeterias');

// GET:  GET ALL CAFETERIAS
router.get('/', cafeteriaController.cafeterias_get_all);
// POST: CREATE A CAFETERIA
router.post('/', checkAuth, cafeteriaController.cafeterias_create_cafeteria);
// GET: GET A SINGLE CAFETERIA
router.get('/:cafeteriaId', cafeteriaController.cafeterias_get_cafeteria);
// PATCH: UPDATE A SINGLE CAFETERIA
router.patch('/:cafeteriaId', checkAuth, cafeteriaController.cafeterias_update_cafeteria);
// DALETE: DELETE A SINGLE CAFETERIA
router.delete('/:cafeteriaId', checkAuth, cafeteriaController.cafeterias_delete_cafeteria);

module.exports = router;