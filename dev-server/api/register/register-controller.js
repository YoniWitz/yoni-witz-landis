const StringUtil = require('../../utilities/string-util');
const User = require('../../models/user-model');

module.exports = {
    create: function (req, res) {
        const validation = validateRegistration(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password,
            first: req.body.first,
            last: req.body.last
        });

        user.save(error => {
            if (error) {
                if (error.code === 11000) {//username taken
                    return res.status(403).json({ message: 'Username is already taken' });
                }
                return res.status(500).json({ message: error });
            }
            return res.status(201).json();
        });
    }
}

function validateRegistration(body) {
    let errors = '';
    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is required ';
    }

    if (StringUtil.isEmpty(body.password)) {
        errors += 'password is required ';
    }

    if (StringUtil.isEmpty(body.first)) {
        errors += 'First name is required ';
    }

    if (StringUtil.isEmpty(body.last)) {
        errors += 'Last name is required ';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}