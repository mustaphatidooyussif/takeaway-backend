const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Item'
        }
    ],
    date : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', menuSchema);
