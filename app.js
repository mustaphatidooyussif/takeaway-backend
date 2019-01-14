const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const databaseConn = require("./api/config/database");

const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');
const cafeteriaRoutes = require('./api/routes/cafeterias');
const menuRoutes = require('./api/routes/menus');
const itemsRoutes = require('./api/routes/foodItem');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

// Connect To Database
databaseConn.connection();
// On Connection
databaseConn.success();
// On Error
databaseConn.error();

mongoose.Promise = global.Promise;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/cafeterias", cafeteriaRoutes);
app.use("/menus", menuRoutes);
app.use("/food", itemsRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;