const StringUtil = require('../../utilities/string-util');
const User = require('../../models/user-model');

module.exports = function index(req, res) {
    const validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }
    User.findOne({ username: req.body.username.toLowerCase() },
        (error, user) => {
            if (error) {
                return res.status(500).json();
            }
            if (!user) {
                return res.status(401).json();
            }
            const passwordMatch = true;
            if (!passwordMatch) {
                return res.status(401).json();
            }
            return res.status(204).json();
        })
}

function validateIndex(body) {
    let errors = '';
    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is required';
    }

    if (StringUtil.isEmpty(body.password)) {
        errors += 'password is required';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}