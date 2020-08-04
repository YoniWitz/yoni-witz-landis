const express = require('express');
const router = express.Router();
const controller = require('./auth-controller');

router.post('/auth', controller.login);

module.exports = router;