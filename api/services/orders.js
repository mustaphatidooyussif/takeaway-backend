const mongoose = require("mongoose");
const Order = require('../models/orders');


async function deleteOrderById(orderId){
    try{
        return Order.remove({ _id: orderId });
    }catch(error){
        throw new Error('could not delete the Order');
    }
}

async function findAllOrders(){
    try{
        return Order.find();
    }catch(error){
        throw new Error(`Unable to orders.`);
    }
}

async function findOrderById(orderId){
    try{
        return Order.findOne({'_id': orderId});
    }catch(error){
        throw new Error(`Unable to find food item.`);
    }
}

async function createOrder(req){
    const order = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    try{
        let newOrder = await order.save();
        return newOrder;
    }catch(error){
        throw new Error(`could not create the new order`);
    } 
}

async function editOrder(req){
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    try{
        return Cafeteria.update({ _id: id }, { $set: updateOps });
    }catch(error){
        throw new Error('could not update order');
    }
}

module.exports = {
    deleteOrderById,
    findAllOrders,
    findOrderById,
    createOrder,
    editOrder
}
