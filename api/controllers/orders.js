const Service =  require('../services/main');

async function createOrder(req, res, next){
    const userId = req.body.user;
    const itemsIds = req.body.items;
    try{
        const user = await Service.UserService.findUserById(userId);
        if(!user){
            throw new Error('user not found');
        }
        if(itemsIds){
            for (const itemId of itemsIds) {
                try{
                    const item = await Service.FoodItemService.findFoodItemById(itemId);
                    if(!item){
                        throw new Error('item not found');
                    }
                }catch(error){
                    throw error;
                }
            }
        }
        const newOrder = await Service.OrderService.createOrder(req);
        return res.status(201).json({
            message: 'order created',
            newOrder: newOrder
        });
    }catch(error){
        throw error;
    }
}
async function getAllOrders(req, res, next){
    try{
        const orders = await Service.OrderService.findAllOrders();
        if(orders){
            return res.status(200).json(orders);
        }else{
            return res.status(404).json({
                message: 'Orders not found'
            });
        }
    }catch(error){
        throw error;
    }

}

async function getSingleOrder(req, res, next){
    const orderId = req.params.orderId;
    try{
        const order = await Service.OrderService.findOrderById(orderId);
        if(order){
            return res.status(200).json({
                message: 'return single order',
                order: order
            });
        }else{
            return res.status(404).json({
                message: 'Order not found'
            });
        }  
    }catch(error){
        throw error;
    }
}

async function deleteOrder(req, res, next){
    const orderId = req.params.orderId;
    try{
        const order = await Service.OrderService.deleteOrderById(orderId);
        return res.status(204).json({
            message: 'order deleted'
        });
    }catch(error){
        throw error;
    }
}

async function updateOrder(req, res, next){
    try{
        const order = await Service.OrderService.editOrder(req);
        return res.status(202).json({
            message: 'updated succesfully'
        });
    }catch(error){
        throw error;
    }
}

module.exports ={
    getAllOrders,
    getSingleOrder,
    deleteOrder,
    updateOrder,
    createOrder
}
