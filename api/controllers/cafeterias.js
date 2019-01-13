const mongoose = require('mongoose');
const Cafeteria = require('../models/cafeterias');
const Service =  require('../services/main');


// GET: GET ALL CAFETERIAS
async function getAllCafeterias(req, res, next){
    const cafeterias =  await Service.CafeteriaService.findAllCafeterias();
    try{
        if(cafeterias){
           return res.status(200).json(cafeterias);
        }else{
           return res.status(200).json({
                message: 'No cafeteria found'
            });
        }
    }catch(error){
        throw error;
    }
}

// // CREATE A SINGLE CAFETERIA
async function createNewCafeteria(req, res, next){
    const name = req.body.name;
    //check if cafeteria already exist
    const cafeteria = await Service.CafeteriaService.findCafeteriaByName(name);
    if(!cafeteria){ //not exist
        try{
            //create new cafeteria
            const cafeteria = await Service.CafeteriaService.createCafeteria(req);
            return res.status(200).json({
                message: "cafeteria created",
                cafeteria: cafeteria
            });
        }catch(error){
            throw error;
        }
    }else{//exist
        return res.status(200).json({
            message: "Cafeteria already exists"
        });
    }
    
}

// // GET A SINGLE CAFETERIA
async function findSingleCafeteria(req, res, next){
    const cafeteriaId = req.params.cafeteriaId;
    const cafeteria = await Service.CafeteriaService.findCafeteriaById(cafeteriaId);
    try{
        if(cafeteria){
            return res.status(200).json({
                message: "return cafeteria",
                cafeteria: cafeteria
            });
        }else{
            return res.status(200).json({
                message: "cafeteria not found"
            });
        }
        }catch(error){
            throw error;
        }
}
   
// // DELETE: DELETE A SINGLE CAFETRIA
async function deleteCafeteria(req, res, next){
    const cafeteriaId = req.params.cafeteriaId;
    try{
        const cafeteria = await Service.CafeteriaService.deleteCafeteriaById(cafeteriaId);
        return res.status(200).json({
            message: 'cafeteria deleted'
        });
    }catch(error){
        throw error;
    }
    
}

// // UPDATE A SINGLE CAFETERIA
async function EditCafeteria(req, res, next){
    try{
        const cafeteria = await Service.CafeteriaService.updateCafeteriaSettings(req);
        return res.status(200).json({
            message: 'updated succesfully'
        });
    }catch(error){
        throw error;
    }
}

module.exports.getAllCafeterias = getAllCafeterias;
module.exports.createNewCafeteria = createNewCafeteria;
module.exports.findSingleCafeteria = findSingleCafeteria;
module.exports.deleteCafeteria = deleteCafeteria;
module.exports.EditCafeteria = EditCafeteria;