const express = require('express');
const router = express.Router();
const controller = require('./applicants-controller');

router.post('/applicant', controller.create);

router.get('/applicant', controller.index);

router.get('/applicant/:id', controller.get);

router.put('/applicant/', controller.update);

router.delete('/applicant', controller.delete);

module.exports = router;