const express = require('express');
const router = express.Router();

router.post('/auth', (req, res) => {
    res.send('post.auth - login');
});

module.exports = router;