const jwt = require('jsonwebtoken');

module.exports = function generateJWT(user) {
    const tokenData = { username: user.username, id: user._id };
    return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET);
}