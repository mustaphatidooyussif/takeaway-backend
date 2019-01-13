const mongoose = require("mongoose");

const Order = require("../models/orders");
const User = require("../models/user");
const Item = require('../models/fooditem');


// GET: GET ALL ORDERS
exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select("user matron items date _id")
        .populate("user items")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                message: "get all orders",
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        user: doc.user,
                        items: doc.items,
                        date: doc.date,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// POST: CREATE ORDER
exports.orders_create_order = (req, res, next) => {
    const userId = req.body.user;
    const itemsIds = req.body.items;
    // Check that user exists
    User.findById(userId)
        .select("user matron items date _id")
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            };
            // Check  all items ids that exist
            for (const itemId of itemsIds) {
                Item.findById(itemId)
                    .exec()
                    .then(item => {
                        if (!item) {
                            return res.status(404).json({
                                message: 'Fooditem not found'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            };
            // create order if all ids exist
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                user: req.body.user,
                matron: req.body.matron,
                items: req.body.items
            });
            order
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "order created successfully",
                        order_id: result._id
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// GET: GET A SINGLE ORDER
exports.orders_get_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select("user matron items date _id")
        .populate("user items")
        .exec()
        .then(order => {
            console.log(order);
            if (!order) {
                res.status(404).json({
                    message: 'Order not found'
                });
            };
            res.status(200).json({
                message: 'return single order',
                order: {
                    _id: order._id,
                    user: order.user,
                    items: order.items,
                    date: order.date,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/orders/" + order._id
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// PATCH: UPDATE A SINGLE ORDER
exports.orders_update_order = (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propsName] = ops.value;
    };
    console.log(updateOps);
    Order.findByIdAndUpdate(id, { $set: updateOps }, { new: true })
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            };
            res.status(200).json({
                message: 'Order updated successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// DELETE: DELETE A SINGLE ORDER
exports.orders_delete_order = (req, res, next) => {
    Order.findByIdAndRemove(req.params.orderId)
        .exec()
        .then(order => {
            console.log(order);
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            };
            res.status(200).json({
                message: 'order deleted successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};