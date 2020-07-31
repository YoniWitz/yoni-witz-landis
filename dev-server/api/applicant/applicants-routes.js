const express = require('express');
const router = express.Router();

router.post('/applicant', (req, res) => {
    res.send('post.applicant - create a task');
});

router.get('/applicant', (req, res) => {
    res.send('get.applicant - get all applicants');
});

router.get('/applicant/:id', (req, res) => {
    res.send('get.applicant/:id - get applicant by id');
});

router.put('/applicant/', (req, res) => {
    res.send('put.applicant - edit applicant');
});
router.delete('/applicant', (req, res) => {
    res.send('delete.applicant - delete an applicant');
});

module.exports = router;