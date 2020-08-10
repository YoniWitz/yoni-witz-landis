const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors');

module.exports = function setEnvironment(app) {
    !process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production'? setDevEnv(app) : setProdEnv(app);
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development';
    process.env.DB_URL = 'mongodb://localhost:27017/my-db';
    process.env.TOKEN_SECRET = 'my-dev-secret';
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(cors());
    console.log("setting dev environment")
}

function setProdEnv(app) {
    process.env.NODE_ENV = 'production';
    process.env.DB_URL = 'mongodb+srv://yoniwitz:1234@applicants.c5ksp.mongodb.net/applicants?retryWrites=true&w=majority';
    process.env.TOKEN_SECRET = 'my-prod-secret';
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../../dist'));
    console.log("setting prod environment")
}