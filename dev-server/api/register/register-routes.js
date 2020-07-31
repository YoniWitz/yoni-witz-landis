const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.send('post.applicant - register a user');
});


module.exports = router;