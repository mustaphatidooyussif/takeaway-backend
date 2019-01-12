const mongoose = require('mongoose');
const Item = require('../models/fooditem');


// GET: GET ALL FOOD ITEMS
exports.fooditem_get_all = (req, res, next) => {
    Item.find()
        .exec()
        .then(items => {
            console.log(items);
            res.status(200).json({
                message: 'return all food items succesfully',
                items: items
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });;
        });
};
// POST: CREATE FOOD ITEM 
exports.fooditem_create_fooditem = (req, res, next) => {
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    item
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'food item created successfully',
                fooditem: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// GET: RETURN A SINGLE FOOD ITEM
exports.fooditem_get_fooditem = (req, res, next) => {
    const id = req.params.itemId;
    Item
        .findById(id)
        .exec()
        .then(item => {
            if (item) {
                console.log(item);
                res.status(200).json({
                    message: 'return single fooditem',
                    fooditem: item
                });

            } else {
                console.log(item);
                res.status(404).json({
                    message: 'Item not found'
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

// PATCH: UPDATE A SINGLE FOOD ITEM
exports.fooditem_update_fooditem = (req, res, next) => {
    const id = req.params.itemId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Item.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Item updated succesfully'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//DELETE: DELETE A SINGLE FOOD ITEM
exports.fooditem_delete_fooditem = (req, res, next) => {
    const id = req.params.itemId;
    Item
        .remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'FoodItem deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};