const express = require('express');
const router = express.Router();
const controller = require('./user-controller.js');

router.get('/user', controller);

module.exports = router;