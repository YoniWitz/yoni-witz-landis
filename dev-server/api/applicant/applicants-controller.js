module.exports = {
    index: function (req, res) {
        return res.status(200).json();
    },
    create: function (req, res) {
        return res.status(201).json();
    },
    update: function (req, res) {
        return res.status(204).json();
    },
    delete: function (req, res) {
        return res.status(204).json();
    },
    get: function (req, res) {
        return res.status(200).json();
    }
}