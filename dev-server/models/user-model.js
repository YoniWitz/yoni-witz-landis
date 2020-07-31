const mongoose = require('mongoose');
const StringUtil = require('../utilities/string-util');
const userSchema = new mongoose.Schema({
    username: String,
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

userSchema.pre('save', function(next){
    this.username = this.username.toLowerCase();
    this.first = this.first.toLowerCase();
    this.last = this.last.toLowerCase();
    next();
});

module.exports = mongoose.model('user', userSchema);