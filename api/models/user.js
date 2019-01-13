const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    usertype: { type: String, required: true }, // specifies whether student/matron/admin
    password: { type: String, required: true },
    photo: { type: String, required: false },
    phone: { type: String, required: false },
    date: { type: Date, default: Date.now }
});

//Hash password before save
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

//chech if user already exist
userSchema.pre('save', function (next) {
    var self = this;
    User.find({name : self.name}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            console.log('User exists: ',self.name);
            next(new Error("user exists!"));
        }
    });
});

//compare passwords
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);