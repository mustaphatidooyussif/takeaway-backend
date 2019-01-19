const mongoose = require('mongoose');
const Service = require('../services/main');


async function getAllFoodItems(req, res, next){
    const items = await Service.FoodItemService.findAllFooodItems();
    try{
        return res.status(200).json(items);
    }catch(error){
        throw error;
    }
}

async function createNewFoodItem(req, res, next){
    const name = req.body.name;
    const item = await Service.FoodItemService.findFoodItemByName(name);
    try{
        if(!item){
            const newItem =  await Service.FoodItemService.createFoodItem(req);
            return res.status(201).json({
                message: "Item created",
                item: newItem
            });
        }else{
            return res.status(200).json({
                message: "Menu alreadyexist"
            });
        }
    }catch(error){
        throw error;
    }
}

async function getFoodItem(req, res, next){
    const id = req.params.itemId;
    try{
        const item = await Service.FoodItemService.findFoodItemById(id);
        console.log(item);
        if(item){
            return res.status(200).json({
                message: "return a single item",
                item: item
            });
        }else{
            res.status(404).json({
                message: "Item not found"
            })
        }
    }catch(error){
        throw error;
    }
}

// // UPDATE A SINGLE menu
async function EditFoodItem(req, res, next){
    const id = req.params.itemId;
    const item = await Service.FoodItemService.findFoodItemById(id);
    if(item){
        try{
            const item = await Service.FoodItemService.editItem(req);
            return res.status(202).json({
                message: 'updated succesfully',
                item: item
            });
        }catch(error){
            throw error;
        }
    }else{
        return res.status(404).json({
            message: "Menu does not exist"
        });
    }

}

// // DELETE: DELETE A SINGLE item
async function deleteFoodItem(req, res, next){
    const itemId = req.params.itemId;
    try{
        const item = await Service.FoodItemService.deleteFoodItemById(itemId);
        return res.status(204).json({
            message: 'Item deleted'
        });
    }catch(error){
        throw error;
    }
    
}

module.exports.getAllFoodItems = getAllFoodItems;
module.exports.createNewFoodItem = createNewFoodItem;
module.exports.getFoodItem = getFoodItem;
module.exports.EditFoodItem = EditFoodItem;
module.exports.deleteFoodItem = deleteFoodItem;
