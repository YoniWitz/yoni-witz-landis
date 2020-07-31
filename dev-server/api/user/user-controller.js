module.exports = function index(req, res) {
    return res.status(200).json({ message: 'Hello World' });
}