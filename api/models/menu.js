const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    date: { type: Date, default: Date.now }
});

//chech if Menu already exist
menuSchema.pre('save', function (next) {
    var self = this;
    Menu.find({name : self.name}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            console.log('Menu exists: ',self.name);
            next(new Error("Menu exists!"));
        }
    });
});

module.exports = mongoose.model('Menu', menuSchema);