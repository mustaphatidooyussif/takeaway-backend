const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get("/", (req, res, next)=>{
    res.status(200).json({
        messege: 'get request'
    })
});

router.post("/", (req, res, next)=>{
    res.status(200).json({
        messege: 'post request'
    })
});

router.get("/:orderId", (req, res, next)=>{
    res.status(200).json({
        messege: 'get request'
    })
});

router.delete("/:orderId", checkAuth, (req, res, next)=>{
    res.status(200).json({
        messege: 'delete request'
    })
});

module.exports = router;
