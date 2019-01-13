const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get("/", checkAuth, OrdersController.orders_get_all);
// POST /ORDERS: CREATE ORDER 
router.post("/", checkAuth, OrdersController.orders_create_order);
// GET /ORDERS/:ORDERID: GET A SINGLE ORDER
router.get("/:orderId", checkAuth, OrdersController.orders_get_order);
// UPDATE /ORDERS/:ORDERID
router.patch("/:orderId", checkAuth, OrdersController.orders_update_order);
// DELETE /ORDERS/ORDERID
router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);

module.exports = router;