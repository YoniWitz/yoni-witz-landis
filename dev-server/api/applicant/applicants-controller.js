
const Applicant = require('../../models/applicant-model');
const StringUtil = require('../../utilities/string-util');
const moment = require('moment');

module.exports = {
    index: function (req, res) {
        Applicant.find({}, (error, applicants) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ applicants });
        });
    },
    analysis: function (req, res) {
        Applicant.find({}, (error, applicants) => {
            if (error) {
                return res.status(500).json();
            }
            let analysis = {
                "Jan": 0,
                "Feb": 0,
                "Mar": 0,
                "Apr": 0,
                "May": 0,
                "Jun": 0,
                "Jul": 0,
                "Aug": 0,
                "Sep": 0,
                "Oct": 0,
                "Nov": 0,
                "Dec": 0
            };
            applicants.forEach(applicant => {
                if ((applicant.credit / 10 + applicant.balance / 100 + (applicant.employer ? 10 : 0)) > 100)
                    analysis[moment(applicant.createdAt).format(
                        "MMM"
                    )] = analysis[moment(applicant.createdAt).format(
                        "MMM"
                    )] + 1
            })
            return res.status(200).json(Object.values(analysis));
        });
    },
    create: function (req, res) {
        const validation = validateApplicant(req.body.applicant);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }
        const applicant = new Applicant(req.body.applicant);
        applicant.save(error => {
            if (error) {
                if (error.code === 11000) {//email taken
                    return res.status(403).json({ message: 'Email is already in use' });
                }
                return res.status(500).json({ message: error });
            }
            return res.status(201).json();
        });
    },
    update: function (req, res) {
        const validation = validateApplicant(req.body.applicant);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }
        const applicant = new Applicant(req.body.applicant);

        Applicant.findByIdAndUpdate({ _id: applicant._id }, applicant, (error, currentApplication) => {
            if (error) {
                if (error.code === 11000) {//email taken
                    return res.status(403).json({ message: 'Email is already in use' });
                }
                return res.status(500).json({ message: error });
            }
            if (!currentApplication) {
                return res.status(404).json({ message: 'Applicant not found' });
            }
            return res.status(204).json();
        });
    },
    delete: function (req, res) {
        Applicant.findOne({ _id: req.params.id }, (error, applicant) => {
            if (error) {
                return res.status(500).json();
            }
            if (!applicant) {
                return res.status(404).json();
            }
            applicant.deleteOne({ _id: req.params.id }, error => {
                if (error) {
                    return res.status(500).json();
                };
                return res.status(204).json();
            });
        });
    },
    get: function (req, res) {
        Applicant.findOne({ _id: req.params.id }, (error, applicant) => {
            if (error) {
                return res.status(500).json();
            }
            if (!applicant) {
                return res.status(404).json();
            }
            return res.status(200).json({ applicant: applicant });
        });
    }
}

function validateApplicant(applicant) {
    let errors = '';
    if (StringUtil.isEmpty(applicant.balance)) {
        errors += 'Balance is required ';
    }

    if (StringUtil.isEmpty(applicant.credit)) {
        errors += 'Credit is required ';
    }

    if (StringUtil.isEmpty(applicant.picture)) {
        errors += 'Picture name is required ';
    }

    if (StringUtil.isEmpty(applicant.name_first)) {
        errors += 'First name is required ';
    }

    if (StringUtil.isEmpty(applicant.name_last)) {
        errors += 'Last name is required ';
    }

    if (StringUtil.isEmpty(applicant.email)) {
        errors += 'Email is required ';
    }

    if (StringUtil.isEmpty(applicant.phone)) {
        errors += 'Phone name is required ';
    }

    if (StringUtil.isEmpty(applicant.address)) {
        errors += 'Address name is required ';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}