const express = require('express');
const app = express();
const registerRoutes = require('./routes');
const setEnvironment = require('./config/env');
const connectToDB = require('./config/db');
const port = 3000;

setEnvironment(app);
connectToDB();
registerRoutes(app);

app.get('/', (req, res) => {
    return process.env.NODE_ENV !== 'production ' ? res.send('Running server in dev mode')
        : res.sendFile('index.html', { root: __dirname + '/../dist/' });
});

app.listen(port, () => console.log(`app listening on port 3000 in ${process.env.NODE_ENV} mode`));