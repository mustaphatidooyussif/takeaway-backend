const mongoose = require("mongoose");
const Cafeteria = require('../models/cafeterias');


async function findAllCafeterias(){
    try{
        return Cafeteria.find();
    }catch(error){
        throw new Error(`Unable to connect to the database.`);
    }
}

async function createCafeteria(req){
    const cafeteria = new Cafeteria({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        menus: req.body.menus,
        matrons: req.body.matrons,
        location: req.body.location
    });
    try{
        let newCafeteria = await cafeteria.save();
        return newCafeteria;
    }catch(error){
        console.log(error);
        throw new Error(`could not create the Cafeteria`);
    }
}

async function findCafeteriaById(cafeteriaId){
    try{
        return Cafeteria.findOne({'_id': cafeteriaId});
    }catch(errro){
        throw new Error(`Unable to connect to the database.`) 
    }
}

async function deleteCafeteriaById(cafeteriaId){
    try{
        return Cafeteria.remove({ _id: cafeteriaId });
    }catch(error){
        throw new Error('could not delete Cafeteria');
    }
}

async function findCafeteriaByName (name) {
    try {
        return Cafeteria.findOne({'name': name});
    } catch (error) {
        throw new Error(`Unable to cafeteria.`)
    }
}

async function updateCafeteriaSettings(req){
    const id = req.params.cafeteriaId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    try{
        return Cafeteria.update({ _id: id }, { $set: updateOps });
    }catch(error){
        throw new Error('could not update Cafeteria');
    }
}
module.exports.findAllCafeterias = findAllCafeterias;
module.exports.createCafeteria = createCafeteria;
module.exports.deleteCafeteriaById = deleteCafeteriaById;
module.exports.findCafeteriaById = findCafeteriaById;
module.exports.findCafeteriaByName = findCafeteriaByName;
module.exports.updateCafeteriaSettings = updateCafeteriaSettings;