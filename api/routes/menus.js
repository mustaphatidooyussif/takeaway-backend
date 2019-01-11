const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Menu = require('../models/menu');

router.get('/', (req, res, next)=>{
    Menu.find()
        .select("_id name date items")
        .exec()
        .then(menus => {
            console.log(menus);      
            res.status(200).json({
                messege: 'return menus succesfully',
                menus: menus
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
              });;
        });

});

router.post('/', checkAuth, (req, res, next)=>{
    const menu =  new Menu({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        items: req.body.items
    });

    menu
        .save()
        .then(result => {
            console.log(result);         
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
              });
        });
});

router.get('/:menuId', (req, res, next)=>{
    const id = req.params.menuId;
    Menu
        .findById(id)
        .select("_id name date items")
        .exec()
        .then(menu => {
            if(menu){
                console.log(menu);
                res.status(200).json({
                    message: 'return single menu',
                    menu: menu
                });

            }else{
                console.log(menu);
                res.status(404).json({
                    message: 'menu not found'
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        });
});

router.patch('/:menuId', checkAuth, (req, res, next)=>{
    const id = req.params.menuId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Menu.update({ _id: id }, { $set: updateOps })
           .exec()
           .then(result =>{
               console.log(result);
               res.status(200).json({
                   message: 'Menu updated succesfully'
               });
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error : err
               });
           });
});

router.delete('/:menuId', checkAuth, (req, res, next)=>{
    const id =  req.params.menuId;
    Menu
        .remove({_id: id})
        .exec()
        .then(result =>{
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
});

module.exports = router;