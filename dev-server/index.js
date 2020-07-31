const express = require('express');
const app = express();
const registerRoutes = require('./routes');
const setEnvironment = require('./config/env.js');

setEnvironment(app);
registerRoutes(app);
const port = 3000;

app.get('/', (req, res) => {
    if(process.env.NODE_ENV !== 'production '){
        return res.send(
            'Running server in dev mode'
        );
    } else{
        return res.sendFile('index.html', {root: __dirname + '/../dist/'});
    }

});

app.listen(port, () => console.log(`app listening on port 3000 in ${process.env.NODE_ENV} mode`));