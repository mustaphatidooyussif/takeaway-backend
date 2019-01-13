const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Service =  require('../services/main');

// GET: GET ALL CAFETERIAS
async function getAllUsers(req, res, next){
    const users =  await Service.UserService.findAllUsers();
    try{
        if(users){
           return res.status(200).json(users);
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
async function signUpUser(req, res, next){
    const email = req.body.email;
    //check if cafeteria already exist
    const user = await Service.UserService.findUserByEmail(email);
    if(!user){ //not exist
        try{
            //create new cafeteria
            const newUser = await Service.UserService.createUser(req);
            return res.status(200).json({
                message: "user sign up",
                newUser: newUser
            });
        }catch(error){
            throw error;
        }
    }else{//exist
        return res.status(200).json({
            message: "user already exists"
        });
    }
    
}

// // GET A SINGLE CAFETERIA
async function findSingleUser(req, res, next){
    const userId = req.params.userId;
    const user = await Service.UserService.findUserById(userId);
    try{
        if(user){
            return res.status(200).json({
                message: "return user",
                user: user
            });
        }else{
            return res.status(200).json({
                message: "user not found"
            });
        }
        }catch(error){
            throw error;
        }
}

//Login user
async function logInUser(req, res,next){
    const email = req.params.email;
    try{
        const user = await Service.UserService.findUserByEmail(email);
        if(user){
            return res.status(200).json({
                message: "Authentication failed"
            });
        }else{
            user.comparePassword(user.password, function(err, isMatch) {
                if (err) throw err;
                console.log('Password123:', isMatch); 
                return res.status(200).json({
                    message: "login successfully"
                });
    
            });
        }
    }catch(error){
        throw error;
    }
    
}
   
// // DELETE: DELETE A SINGLE CAFETRIA
async function deleteUser(req, res, next){
    const userId = req.params.userId;
    try{
        const user = await Service.UserService.deleteUserById(userId);
        return res.status(200).json({
            message: 'user deleted'
        });
    }catch(error){
        throw error;
    }
    
}

// // UPDATE A SINGLE CAFETERIA
async function EditUser(req, res, next){
    const {_id, name, email, password, photo, phone } = req.body;
    try{
        const user = await Service.UserService.updateProfileSettings (_id, name, email, password, photo, phone);
        return res.status(200).json({
            message: 'updated succesfully'
        });
    }catch(error){
        throw error;
    }
}

module.exports.getAllUsers = getAllUsers;
module.exports.signUpUser = signUpUser;
module.exports.findSingleUser = findSingleUser;
module.exports.deleteUser = deleteUser;
module.exports.EditUser = EditUser;
module.exports.logInUser = logInUser;
