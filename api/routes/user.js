const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  
router.get("/", (req, res, next)=>{
    User.find()
        .exec()
        .then(users =>{
            console.log(users);
            res.status(200).json({
                message: "return users succesfully",
                users: users
            });
        })
        .catch(err =>{
            res.status(500).json({
                error:err
            });
        });
});

router.get("/:userId", (req, res, next)=>{
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(user =>{
            console.log(user);
            res.status(200).json({
                message: "return single user",
                user: user
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/signup", upload.single('photo'), (req, res, next)=>{
    //Check if user already exist with the same email
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length >1){  //user exist
                return res.status(409).json({
                    messege: "email already exist"
                });
            }else{  //user does not exist
                //hash the password before saving the user
                const password = req.body.password;
                bcrypt.hash(password, 10, (err, hash)=> {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            phone: req.body.phone,
                            photo: req.file.path
                        });

                        user
                            .save()
                            .then(result =>{
                                console.log(result);
                                res.status(201).json({
                                    messege: "user created succesfully",
                                    user: result
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error : err
                                });
                            });
                    }
                });
            }
        });
  });

router.post("/login", (req, res, next)=>{
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                messege: "Authentication failed"
            });
        }else{
            const password =req.body.password; 
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        messege: "Authentication failed"
                    });
                }
                if(result){
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            id: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                          expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        messege: "Authentication successful",
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
  });

router.delete("/:userId", checkAuth, (req, res, next)=>{
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
  });

module.exports = router;
