const applicantRoutes = require('./api/applicant/applicants-routes');
const userRoutes = require('./api/user/user-routes');
const registerRoutes = require('./api/register/register-routes');
const authRoutes = require('./api/auth/auth-routes');


module.exports = function registerRoutes(app) {
    app.use('/api', applicantRoutes);
    app.use('/api', authRoutes);
    app.use('/api', userRoutes);
    app.use('/api', registerRoutes);
}