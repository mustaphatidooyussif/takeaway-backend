const mongoose = require("mongoose");

module.exports = {
    // Connect To Database
    connection: () => {
        mongoose.connect(process.env.DATABASE, {
            useMongoClient: true
        });
    },

    // On Connection
    success: () => {
        mongoose.connection.on('connected', () => {
            console.log('Connected to database ' + process.env.DATABASE);
        });
    },

    // On Error
    error: () => {
        mongoose.connection.on('error', (err) => {
            console.log('Database error: ' + err);
        });
    }
}