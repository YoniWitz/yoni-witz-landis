const express = require('express');
const router = express.Router();
const controller = require('./applicants-controller');
const auth = require('../../services/auth-service');

router.post('/applicant', auth.requireLogin, controller.create);

router.get('/applicant', auth.requireLogin, controller.index);

router.get('/applicant/analysis', auth.requireLogin, controller.analysis);

router.get('/applicant/:id', auth.requireLogin, controller.get);

router.put('/applicant/', auth.requireLogin, controller.update);

router.delete('/applicant/:id', auth.requireLogin, controller.delete);

module.exports = router;