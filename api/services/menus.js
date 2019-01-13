const mongoose = require("mongoose");
const Menu = require('../models/menu');

async function deleteMenuById(menuId){
    try{
        return Menu.remove({ _id: menuId });
    }catch(error){
        throw new Error('could not delete menu');
    }
}

async function findAllMenus(){
    try{
        return Menu.find();
    }catch(error){
        throw new Error(`Unable to find users.`);
    }
}

async function findMenuById(menuId){
    try{
        return Menu.findOne({'_id': menuId});
    }catch(error){
        throw new Error(`Unable to find menu.`) 
    }
}

async function createMenu(req){
    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        items: req.body.items
    });

    try{
        let newMenu = await menu.save();
        return newMenu;
    }catch(error){
        throw new Error(`could not create the menu`);
    } 
}

module.export ={
    deleteMenuById,
    findAllMenus,
    findMenuById,
    createMenu
}
