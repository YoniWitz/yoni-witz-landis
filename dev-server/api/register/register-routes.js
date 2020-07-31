const express = require('express');
const router = express.Router();
const controller = require('./register-controller.js');

router.post('/register', controller);


module.exports = router;