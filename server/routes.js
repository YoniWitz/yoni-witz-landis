const applicantRoutes = require('./api/applicant/applicants-routes');
const regRoutes = require('./api/register/register-routes');
const authRoutes = require('./api/auth/auth-routes');

module.exports = function registerRoutes(app) {
    app.use('/api', regRoutes);
    app.use('/api', applicantRoutes);
    app.use('/api', authRoutes);
}