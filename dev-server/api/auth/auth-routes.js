const express = require('express');
const router = express.Router();
const controller = require('./auth-controller.js');

router.post('/auth', controller.index);

module.exports = router;