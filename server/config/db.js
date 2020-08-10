const mongoose = require('mongoose');

module.exports = function connectToDB() {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
        error => {
            if (error) {
                console.log('Unablae to connect to db');
                throw error;
            } else {
                console.log('Connected to MongoDB');
            }
        });
}