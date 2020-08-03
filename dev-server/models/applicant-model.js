const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    balance: Number,
    credit:Number,
    picture: String,
    name_first: String,
    name_last: String,
    employer: String,
    email: String,
    phone: Number,
    address: String,
    comments: String,
    tags: Array
});
applicantSchema.set('timestamps', true);

module.exports = mongoose.model('applicant', applicantSchema);