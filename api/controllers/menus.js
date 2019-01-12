const mongoose = require('mongoose');
const Menu = require('../models/menu');


// GET: GET ALL MENUS
exports.menus_get_all = (req, res, next) => {
    Menu.find()
        .select("_id name date items")
        .exec()
        .then(menus => {
            console.log(menus);
            res.status(200).json({
                message: 'return menus succesfully',
                menus: menus
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });;
        });

};

// POST: CREATE A MENU
exports.menus_create_menu = (req, res, next) => {
    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        items: req.body.items
    });

    menu
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'cafeteria created successfully',
                menu: result,
                request: {
                    type: 'POST',
                    description: 'send post request to create food item',
                    url: 'http://localhost:3000/food/'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// GET: GET A SINGLE MENU
exports.menus_get_menu = (req, res, next) => {
    const id = req.params.menuId;
    Menu
        .findById(id)
        .select("_id name date items")
        .exec()
        .then(menu => {
            if (menu) {
                console.log(menu);
                res.status(200).json({
                    message: 'return single menu',
                    menu: menu,
                    request: {
                        type: 'POST',
                        description: 'send post request to create food item',
                        url: 'http://localhost:3000/food/'
                    }
                });

            } else {
                console.log(menu);
                res.status(404).json({
                    message: 'menu not found'
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

// PATCH: UPDATE A SINGLE MENU
exports.menus_update_menu = (req, res, next) => {
    const id = req.params.menuId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Menu.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Menu updated succesfully'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// DELETE: DELETE A SINGLE MENU
exports.menus_delete_menu = (req, res, next) => {
    const id = req.params.menuId;
    Menu
        .remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                messege: 'Menu deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};