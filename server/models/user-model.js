const mongoose = require('mongoose');
const StringUtil = require('../utilities/string-util');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.String, unique: true},
    first: String,
    last: String,
    password: String
});

userSchema.set('timestamps', true);

userSchema.virtual('fullName').get(function () {
    const first = StringUtil.capitalize(this.first.toLowerCase());
    const last = StringUtil.capitalize(this.last.toLowerCase());

    return first + ' ' + last;
});

userSchema.statics.passwordMatches = function(password, hash){
    return bcrypt.compareSync(password, hash);
}
userSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase();
    this.first = this.first.toLowerCase();
    this.last = this.last.toLowerCase();
    const unsafePassword = this.password;
    this.password = bcrypt.hashSync(unsafePassword);
    next();
});

module.exports = mongoose.model('user', userSchema);