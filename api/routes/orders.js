const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get("/", OrdersController.getAllOrders);
// // POST /ORDERS: CREATE ORDER 
router.post("/", checkAuth, OrdersController.createOrder);
// // GET /ORDERS/:ORDERID: GET A SINGLE ORDER
router.get("/:orderId", OrdersController.getSingleOrder);
// // UPDATE /ORDERS/:ORDERID
router.patch("/:orderId", checkAuth, OrdersController.updateOrder);
// // DELETE /ORDERS/ORDERID
router.delete("/:orderId", checkAuth, OrdersController.deleteOrder);

module.exports = router;