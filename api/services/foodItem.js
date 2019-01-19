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
        throw error; //new Error(`Unable to find items.`);
    }
}

async function findFoodItemById(itemId){
    try{
        return Item.findOne({ '_id': itemId});
    }catch(error){
        throw new Error(`Unable to find food item.`) 
    }
}

async function findFoodItemByName(name){
    try{
        return Item.findOne({'name': name});
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

async function editItem (req) {
    try {
        const id = req.params.itemId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        return Item.update({ _id: id }, { $set: updateOps });
    } catch (error) {
        throw new Error(`Unable to update item with id "${id}".`)
    }
}

module.exports = {
    deleteFoodItemById,
    findAllFooodItems,
    findFoodItemById,
    createFoodItem,
    findFoodItemByName,
    editItem
}
