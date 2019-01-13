const mongoose = require("mongoose");
const User = require("../models/user");


async function updateProfileSettings (userId, name, email, password, photo, phone) {
    try {
        return User.findOneAndUpdate({'_id': userId}, {
            $set: {
                'name': name,
                'email': email,
                'password': password,
                'photo' : photo,
                'phone': phone
            }
        }, {new: true})
    } catch (error) {
        throw new Error(`Unable to update user with id "${userId}".`)
    }
}

async function findUserByEmail (email) {
    try {
        return User.findOne({'email': email});
    } catch (error) {
        throw new Error(`Unable to connect to the database.`)
    }
}

async function findUserById(userId){
    try{
        return User.findOne({'_id': userId});
    }catch(errro){
        throw new Error(`Unable to connect to the database.`) 
    }
}

async function findAllUsers(){
    try{
        return User.find();
    }catch(error){
        throw new Error(`Unable to connect to the database.`);
    }
    
}

async function createUser(req){
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        usertype: req.body.usertype, // whether student/matron/admin
        password: hash,
        phone: req.body.phone,
        photo: req.file.path
    });
    try{
        let newUser = await user.save();
        return newUser;
    }catch(error){
        throw new Error(`could not create the user`);
    }
    
}

async function deleteUserById(userId){
    try{
        return User.remove({ _id: userId });
    }catch(error){
        throw new Error('could not delete user');
    }
}

module.export ={
    updateProfileSettings,
    findUserByEmail,
    findAllUsers,
    findUserById,
    createUser,
    deleteUserById
}