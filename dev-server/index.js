const express = require('express')
const registerRoutes = require('./routes');
const app = express();

registerRoutes(app);
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))