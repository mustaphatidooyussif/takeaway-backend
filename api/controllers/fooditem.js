const mongoose = require('mongoose');
const Service = require('../services/main');


async function getAllFoodItems(req, res, next){
    const items = await Service.FoodItemService.findAllFooodItems();
    try{
        return res.status(200).json({
            message: 'return succesfully',
            items: items
        });
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
            return res.status(200).json({
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
    const id = req.params.menuId;
    try{
        const menu = await Service.FoodItemService.findFoodItemById(id);
        if(menu){
            return res.status(200).json({
                message: "return a single menu",
                menu: menu
            });
        }else{
            res.status(200).json({
                message: "Menu not found"
            })
        }
    }catch(error){
        throw error;
    }
}

// // UPDATE A SINGLE menu
async function EditFoodItem(req, res, next){
    const id = req.params.menuId;
    const item = await Service.FoodItemService.findFoodItemById(id);
    if(item){
        try{
            const item = await Service.FoodItemService.updateMenuSettings(req);
            return res.status(200).json({
                message: 'updated succesfully',
                item: item
            });
        }catch(error){
            throw error;
        }
    }else{
        return res.status(200).json({
            message: "Menu does not exist"
        });
    }

}

// // DELETE: DELETE A SINGLE item
async function deleteFoodItem(req, res, next){
    const itemId = req.params.itemId;
    try{
        const item = await Service.FoodItemService.deleteMenuById(itemId);
        return res.status(200).json({
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


// // GET: GET ALL FOOD ITEMS
// exports.fooditem_get_all = (req, res, next) => {
//     Item.find()
//         .exec()
//         .then(items => {
//             console.log(items);
//             res.status(200).json({
//                 message: 'return all food items succesfully',
//                 items: items
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });;
//         });
// };
// // POST: CREATE FOOD ITEM 
// exports.fooditem_create_fooditem = (req, res, next) => {
//     const item = new Item({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         price: req.body.price
//     });

//     item
//         .save()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({
//                 message: 'food item created successfully',
//                 fooditem: result
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

// // GET: RETURN A SINGLE FOOD ITEM
// exports.fooditem_get_fooditem = (req, res, next) => {
//     const id = req.params.itemId;
//     Item
//         .findById(id)
//         .exec()
//         .then(item => {
//             if (item) {
//                 console.log(item);
//                 res.status(200).json({
//                     message: 'return single fooditem',
//                     fooditem: item
//                 });

//             } else {
//                 console.log(item);
//                 res.status(404).json({
//                     message: 'Item not found'
//                 });
//             }

//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         });
// };

// // PATCH: UPDATE A SINGLE FOOD ITEM
// exports.fooditem_update_fooditem = (req, res, next) => {
//     const id = req.params.itemId;
//     const updateOps = {};
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Item.update({ _id: id }, { $set: updateOps })
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({
//                 message: 'Item updated succesfully'
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

// //DELETE: DELETE A SINGLE FOOD ITEM
// exports.fooditem_delete_fooditem = (req, res, next) => {
//     const id = req.params.itemId;
//     Item
//         .remove({ _id: id })
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({
//                 message: 'FoodItem deleted'
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };