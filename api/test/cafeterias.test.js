"use strict";

var expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Math', function() {  
    mongoose.Promise = global.Promise;

    let conn = null;

    before(function(done) {
      conn = mongoose.connect(process.env.TESTDB, {
          useMongoClient: true
      });
      done();
    });

    after(function(done) {
      mongoose.connection.once('connected', () => {
        console.log(conn);
        conn.connection.db.dropDatabase();
    });

      done();
    });

    describe('#abs()', function() {
        it('should return positive value of given negative number', function() {
            expect(Math.abs(-5)).to.be.equal(5);
        });

        it('should return positive value of given positive number', function() {
            expect(Math.abs(3)).to.be.equal(3);
        });

        it('should return 0 given 0', function() {
            expect(Math.abs(0)).to.be.equal(0);
        });
    });
});