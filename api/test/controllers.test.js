"use strict";

const chai = require('chai');
const mongoose = require('mongoose');
const app = require('../../app');
const chaiHttp = require('chai-http');
const location = require("../config/db_location.json");
const User = require('../models/user');
const Cafeteria = require('../models/cafeterias');
const Menu =  require('../models/menu');
// const Item = require('../models/fooditem');
const Order = require('../models/orders');
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Testing Take Away API endpoints', function() {  
    mongoose.Promise = global.Promise;

    let conn = null;
    let userId = null;
    let cafeteriaId = null;
    let menuId = null;

    before(function(done) {
        //Create user for testing
        let user = new User({
            '_id': new mongoose.Types.ObjectId(),
            'name': 'Mustapha',
            'email': "mustaphatidooyussif@yahoo.com",
            'usertype': 'customer',
            'password': '12345',
            'phone': '0241234433'
        });
        //save user and get the id
        user.save(function(err){
            if(err) throw err;
            User.findOne({ email: 'mustaphatidooyussif@yahoo.com' }, function(err, user) {
                if (err) throw err;
                userId = user._id;
            });
        });

        
      done();
    });

    after(function(done) {
        mongoose.connection.db.dropDatabase();
      done();
    });

    describe('Tesing user endpoints', function() {
        it('should return positive value of given negative number', function() {
            chai.expect(Math.abs(-5)).to.be.equal(5);
        });

        it('should return positive value of given positive number', function() {
            chai.expect(Math.abs(3)).to.be.equal(3);
        });

        it('should return 0 given 0', function() {
            chai.expect(Math.abs(0)).to.be.equal(0);
        });
    });
});