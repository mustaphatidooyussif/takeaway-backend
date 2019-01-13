const mongoose = require("mongoose");
const Item = require('../models/foodItem');


async function deleteFoodItemById(itemId){
    try{
        return Item.remove({ _id: itemId });
    }catch(error){
        throw new Error('could not delete food item');
    }
}

async function findAllFooodItems(){
    try{
        return Item.find();
    }catch(error){
        throw new Error(`Unable to find items.`);
    }
}

async function findFoodItemById(itemId){
    try{
        return Item.findOne({'_id': itemId});
    }catch(error){
        throw new Error(`Unable to find food item.`) 
    }
}

async function createFoodItem(req){
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    try{
        let newitem = await item.save();
        return newitem;
    }catch(error){
        throw new Error(`could not create the new item`);
    } 
}

module.export = {
    deleteFoodItemById,
    findAllFooodItems,
    findFoodItemById,
    createFoodItem
}
