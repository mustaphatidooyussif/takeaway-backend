const mongoose = require("mongoose");
const location = require("./db_location.json");

module.exports = {
    // Connect To Database
    connection: () => {
        mongoose.connect(location.MONGO_URL, {
            useMongoClient: true
        });
    },

    // On Connection
    success: () => {
        mongoose.connection.on('connected', () => {
            console.log('Connected to database ' + location.MONGO_URL);
        });
    },

    // On Error
    error: () => {
        mongoose.connection.on('error', (err) => {
            console.log('Database error: ' + err);
        });
    }
}