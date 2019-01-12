const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");


// RETURN ALL USERS
exports.user_get_all = (req, res, next) => {
    User.find()
        .exec()
        .then(users => {
            console.log(users);
            res.status(200).json({
                message: "returned all users succesfully",
                users: users
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// GET USER BY USERID
exports.user_get_user = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(user => {
            console.log(user);
            res.status(200).json({
                message: "return single user",
                user: user
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
// POST SIGNUP USER
exports.user_create_user = (req, res, next) => {
    //Check if user already exist with the same email
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 1) { //user exist
                return res.status(409).json({
                    message: "email already exist"
                });
            } else { //user does not exist
                //hash the password before saving the user
                const password = req.body.password;
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            usertype: req.body.usertype, // whether student/matron/admin
                            password: hash,
                            phone: req.body.phone,
                            photo: req.file.path
                        });

                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    messege: "user created succesfully",
                                    user: result
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};
// POST LOGIN USER
exports.user_login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            } else {
                const password = req.body.password;
                bcrypt.compare(password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Authentication failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: user[0].email,
                                id: user[0]._id
                            },
                            process.env.JWT_KEY, {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            _id: user[0].id,
                            message: "Authentication successful",
                            token: token
                        });
                    }
                    res.status(401).json({
                        messege: "Authentication failed"
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
// DELETE USER
exports.user_delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};