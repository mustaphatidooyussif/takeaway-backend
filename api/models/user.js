const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);