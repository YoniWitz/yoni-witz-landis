const StringUtil = require('../../utilities/string-util');
const User = require('../../models/user-model');

module.exports = {
    create: async function (req, res) {
        const validation = validateRegistration(req.body);
        if (!validation.isValid) { return res.status(400).json({ message: validation.message }) };

        const user = new User({
            username: req.body.username,
            password: req.body.password,
            first: req.body.first,
            last: req.body.last
        });

        try {
            await user.save();
        }
        catch (error) {
            //11000 == password taken
            return error.code === 11000 ? res.status(403).json({ message: 'Username is already taken' })
                : res.status(500).json({ message: error });
        }
        return res.status(201).json();
    }
}

function validateRegistration(body) {
    let errors = '';
    errors += StringUtil.isEmpty(body.username) ? 'Username is required ' : '';
    errors += StringUtil.isEmpty(body.password) ? 'password is required ' : '';
    errors += StringUtil.isEmpty(body.first) ? 'First name is required ' : '';
    errors += StringUtil.isEmpty(body.last) ? 'Last name is required ' : '';

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}