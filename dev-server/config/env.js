const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors');

module.exports = function setEnvironment(app) {
        setProdEnv(app);
}

function setProdEnv(app) {
    process.env.DB_URL = 'mongodb+srv://yoniwitz:1234@applicants.c5ksp.mongodb.net/applicants?retryWrites=true&w=majority';
    process.env.TOKEN_SECRET = 'my-prod-secret';
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../../dist'));
    console.log("setting prod environment")
}