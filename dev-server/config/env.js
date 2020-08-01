const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors');


module.exports = function setEnvironment(app) {
    if (process.env.NODE_ENV !== 'production ') {
        setDevEnv(app);
    }
    else {
        setProdEnv(app);
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development';
    process.env.DB_URL = 'mongodb://localhost:27017/my-db';
    process.env.TOKEN_SECRET = 'my-dev-secret';
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(cors());
}

function setProdEnv(app) {
    process.env.DB_URL = 'mogondb://localhost:27017/prod-db';
    process.env.TOKEN_SECRET = 'my-prod-secret';
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../dist'));
}