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
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(cors());
}

function setProdEnv(app) {
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../dist'));
}