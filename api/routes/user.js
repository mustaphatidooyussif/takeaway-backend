const express = require("express");
const router = express.Router();

// const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.get("/", (req, res, next)=>{
    res.status(200).json({
        messege: 'get request'
    })
});

router.get("/:userId", (req, res, next)=>{
    res.status(200).json({
        messege: 'get request'
    })
});

router.post("/signup", (req, res, next)=>{
    res.status(200).json({
        messege: 'post request'
    })
  });

router.post("/login", (req, res, next)=>{
    res.status(200).json({
        messege: 'post request'
    })
  });

router.delete("/:userId", (req, res, next)=>{
    res.status(200).json({
        messege: 'delete request'
    })
  });

module.exports = router;
