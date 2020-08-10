const StringUtil = require('../../utilities/string-util');
const User = require('../../models/user-model');
const authService = require('../../services/auth-service')

module.exports = {
    login: async function (req, res) {
        const validation = validateLogin(req.body);
        if (!validation.isValid) return res.status(400).json({ message: validation.message });

        try {
            const user = await User.findOne({ username: req.body.username.toLowerCase() });
            if (!user) return res.status(401).json({ message: "Username and Password not found" });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
        
        const passwordMatches = User.passwordMatches(req.body.password, user.password);

        if (!passwordMatches) return res.status(401).json({ message: "Username and Password not found" });

        const token = authService.generateJWT(user);
        return res.status(200).json({ token: token });
    }
}
function validateLogin(body) {
    let errors = '';
    errors += StringUtil.isEmpty(body.username) ? 'Username is required ' : '';
    errors += StringUtil.isEmpty(body.password) ? 'Password is required' : '';

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}