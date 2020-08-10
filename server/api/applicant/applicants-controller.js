
const Applicant = require('../../models/applicant-model');
const StringUtil = require('../../utilities/string-util');
const moment = require('moment');

module.exports = {
    index: async function (req, res) {
        try {
            const applicants = await Applicant.find({});
            res.status(200).json({ applicants });
        }
        catch{
            res.status(500).json({ message: error });
        }
    },
    analysis: async function (req, res) {
        let applicants;
        try {
            applicants = await Applicant.find({});
        }
        catch {
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
            if ((applicant.credit / 10 + applicant.balance / 100 + (applicant.employer ? 10 : 0)) > 100) {
                analysis[moment(applicant.createdAt).format("MMM")]
                    = analysis[moment(applicant.createdAt).format("MMM")] + 1;
            }
        })

        return res.status(200).json(Object.values(analysis));
    },
    create: async function (req, res) {
        const validation = validateApplicant(req.body.applicant);
        if (!validation.isValid) { return res.status(400).json({ message: validation.message }); }

        const applicant = new Applicant(req.body.applicant);

        try {
            await applicant.save();
        }
        catch (error) {
            //11000 == email taken
            return error.code === 11000 ? res.status(403).json({ message: 'Email is already in use' })
                : res.status(500).json({ message: error });
        }
        return res.status(201).json();
    },
    update: async function (req, res) {
        const validation = validateApplicant(req.body.applicant);
        if (!validation.isValid) { return res.status(400).json({ message: validation.message }); }

        const applicant = new Applicant(req.body.applicant);

        try {
            const currentApplication = await Applicant.findByIdAndUpdate({ _id: applicant._id }, applicant);
            if (!currentApplication) { return res.status(404).json({ message: 'Applicant not found' }); }
        }
        catch (error) {
            //11000 == email taken
            return error.code === 11000 ? res.status(403).json({ message: 'Email is already in use' })
                : res.status(500).json({ message: error });
        }

        return res.status(204).json();
    },
    delete: async function (req, res) {
        let applicant;
        try {
            applicant = await Applicant.findOne({ _id: req.params.id });
            if (!applicant) { return res.status(404).json(); }
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }

        try {
            await applicant.deleteOne({ _id: req.params.id });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }

        return res.status(204).json();
    },
    get: async function (req, res) {
        let applicant;
        try {
            applicant = await Applicant.findOne({ _id: req.params.id });
            if (!applicant) { return res.status(404).json(); }
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }

        return res.status(200).json({ applicant: applicant });
    }
}

function validateApplicant(applicant) {
    let errors = '';

    errors += StringUtil.isEmpty(applicant.balance) ? 'Balance is required ' : '';
    errors += StringUtil.isEmpty(applicant.credit) ? 'Credit is required ' : '';
    errors += StringUtil.isEmpty(applicant.picture) ? 'Picture name is required ' : '';
    errors += StringUtil.isEmpty(applicant.name_first) ? 'First name is required ' : '';
    errors += StringUtil.isEmpty(applicant.name_last) ? 'Last name is required ' : '';
    errors += StringUtil.isEmpty(applicant.email) ? 'Email is required ' : '';
    errors += StringUtil.isEmpty(applicant.phone) ? 'Phone name is required ' : '';
    errors += StringUtil.isEmpty(applicant.address) ? 'Address name is required ' : '';

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}