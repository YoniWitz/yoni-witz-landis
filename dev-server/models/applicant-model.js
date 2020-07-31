const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name_first: String,
    comments: String
});
applicantSchema.set('timestamps', true);

module.exports = mongoose.model('applicant', applicantSchema);