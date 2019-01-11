const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Item = require('../models/fooditem');

router.get('/', (req, res, next)=>{
    Item.find()
        .exec()
        .then(items => {
            console.log(items);      
            res.status(200).json({
                messege: 'return succesfully',
                items: items
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
    const item =  new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    item
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

router.get('/:itemId', (req, res, next)=>{
    const id = req.params.itemId;
    Item
        .findById(id)
        .exec()
        .then(item => {
            if(item){
                console.log(item);
                res.status(200).json({
                    message: 'return single item',
                    item: item
                });

            }else{
                console.log(item);
                res.status(404).json({
                    message: 'Item not found'
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

router.patch('/:itemId', checkAuth, (req, res, next)=>{
    const id = req.params.itemId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Item.update({ _id: id }, { $set: updateOps })
           .exec()
           .then(result =>{
               console.log(result);
               res.status(200).json({
                   message: 'Item updated succesfully'
               });
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error : err
               });
           });
});

router.delete('/:itemId', checkAuth, (req, res, next)=>{
    const id =  req.params.itemId;
    Item
        .remove({_id: id})
        .exec()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                messege: 'Item deleted'
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