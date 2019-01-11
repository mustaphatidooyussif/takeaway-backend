const mongoose = require('mongoose');

const CafeteriaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    menus:  [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Menu'
        }
    ],
    matrons: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }
    ],
    location: {type: String, required: false},
    date : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cafeteria', CafeteriaSchema);