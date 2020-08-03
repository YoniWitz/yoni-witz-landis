
const Applicant = require('../../models/applicant-model');
const auth = require('../../services/auth-service')

module.exports = {
    index: function (req, res) {
        Applicant.find({}, (error, applicants) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ applicants });
        });
    },
    create: function (req, res) {
        const applicant = new Applicant(req.body.applicant);
        applicant.save(error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(201).json();
        });

    },
    update: function (req, res) {
        const applicant = new Applicant(req.body.applicant);


        Applicant.findByIdAndUpdate({ _id: applicant._id }, applicant, error => {
            if (error) {
                return res.status(500).json();
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