const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Cafeteria = require('../models/cafeterias');

router.get('/', (req, res, next)=>{
    Cafeteria.find()
        .exec()
        .then(cafeteria => {
            console.log(cafeteria);      
            res.status(200).json({
                messege: 'return menus succesfully',
                cafeteria: cafeteria
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
    const cafeteria =  new Cafeteria({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        menus: req.body.menus,
        matrons: req.body.matrons,
        location: req.body.location
    });

    cafeteria
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

router.get('/:cafeteriaId', (req, res, next)=>{
    const id = req.params.cafeteriaId;
    Cafeteria
        .findById(id)
        .exec()
        .then(cafeteria => {
            if(cafeteria){
                console.log(cafeteria);
                res.status(200).json({
                    message: 'return single cafeteria',
                    cafeteria: cafeteria
                });

            }else{
                console.log(cafeteria);
                res.status(404).json({
                    message: 'cafeteria not found'
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

router.patch('/:cafeteriaId', checkAuth, (req, res, next)=>{
    const id = req.params.cafeteriaId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Cafeteria.update({ _id: id }, { $set: updateOps })
           .exec()
           .then(result =>{
               console.log(result);
               res.status(200).json({
                   message: 'cafeteria updated succesfully'
               });
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error : err
               });
           });
});

router.delete('/:cafeteriaId', checkAuth, (req, res, next)=>{
    const id =  req.params.cafeteriaId;
    Cafeteria
        .remove({_id: id})
        .exec()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                messege: 'cafeteria deleted'
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