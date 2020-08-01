const StringUtil = require('../../utilities/string-util');
const User = require('../../models/user-model');
const generateJWT = require('../../services/auth-service.js')

module.exports = {
    index: function (req, res) {
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
                const passwordMatches = User.passwordMatches(req.body.password, user.password);

                if (!passwordMatches) {
                    return res.status(401).json();
                }
                const token = generateJWT(user);
                return res.status(200).json({token: token});
            })
    }
}
function validateIndex(body) {
    let errors = '';
    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is required ';
    }

    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}