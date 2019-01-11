const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: {type: Number, required: true},
    date : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', foodItemSchema);