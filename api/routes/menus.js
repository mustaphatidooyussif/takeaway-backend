const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next)=>{
    res.status(200).json({
        messege: 'get request'
    })
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        messege: 'post request'
    })
});

router.put('/:menuId', (req, res, next)=>{
    res.status(200).json({
        messege: 'put request'
    })
});

module.exports = router;