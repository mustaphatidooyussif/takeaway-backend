const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: String, required: true },
    matron: { type: String, default: null },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);