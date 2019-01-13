const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth'); //add this later
const cafeteriaController = require('../controllers/cafeterias');

// GET:  GET ALL CAFETERIAS
router.get('/', cafeteriaController.getAllCafeterias);
// POST: CREATE A CAFETERIA
router.post('/', cafeteriaController.createNewCafeteria);
// // GET: GET A SINGLE CAFETERIA
router.get('/:cafeteriaId', cafeteriaController.findSingleCafeteria);
// // PATCH: UPDATE A SINGLE CAFETERIA
router.patch('/:cafeteriaId', cafeteriaController.EditCafeteria);
// // DALETE: DELETE A SINGLE CAFETERIA
router.delete('/:cafeteriaId', cafeteriaController.deleteCafeteria);

module.exports = router;