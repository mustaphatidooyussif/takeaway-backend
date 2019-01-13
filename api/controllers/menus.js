const mongoose = require('mongoose');
const Service = require('../services/main');

async function getAllMenus(req, res, next){
    const menus = await Service.MenuService.findAllMenus();
    try{
        return res.status(200).json({
            message: 'return succesfully',
            menus: menus
        });
    }catch(error){
        throw error;
    }
}

async function createNewMenu(req, res, next){
    const name = req.body.name;
    const menu = await Service.MenuService.findMenuByName(name);
    try{
        if(!menu){
            const newMenu =  await Service.MenuService.createMenu(req);
            return res.status(200).json({
                message: "Menu created",
                menu: newMenu
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

async function getMenu(req, res, next){
    const id = req.params.menuId;
    try{
        const menu = await Service.MenuService.findMenuById(id);
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
async function EditMenu(req, res, next){
    const id = req.params.menuId;
    const menu = await Service.MenuService.findMenuById(id);
    if(menu){
        try{
            const menu = await Service.MenuService.updateMenuSettings(req);
            return res.status(200).json({
                message: 'updated succesfully',
                menu: menu
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

// // DELETE: DELETE A SINGLE meu
async function deleteMenu(req, res, next){
    const menuId = req.params.menuId;
    try{
        const menu = await Service.MenuService.deleteMenuById(menuId);
        return res.status(200).json({
            message: 'Menu deleted'
        });
    }catch(error){
        throw error;
    }
    
}

module.exports.getAllMenus = getAllMenus;
module.exports.createNewMenu = createNewMenu;
module.exports.getMenu = getMenu;
module.exports.EditMenu = EditMenu;
module.exports.deleteMenu = deleteMenu;
