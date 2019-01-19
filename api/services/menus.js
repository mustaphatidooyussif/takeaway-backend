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
        return Menu.find().populate("items");
    }catch(error){
        throw new Error(`Unable to find users.`);
    }
}

async function findMenuById(menuId){
    try{
        return Menu.findOne({'_id': menuId}).populate("items");
    }catch(error){
        throw new Error(`Unable to find menu.`) 
    }
}

async function findMenuByName(menuName){
    try{
        return Menu.findOne({'name': menuName}).populate("items");
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

async function updateMenuSettings(req){
    const id = req.params.menuId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    try{
        return Menu.update({ _id: id }, { $set: updateOps });
    }catch(error){
        throw new Error('could not update Menu');
    }
}

module.exports ={
    deleteMenuById,
    findAllMenus,
    findMenuById,
    createMenu,
    findMenuByName,
    updateMenuSettings
}
