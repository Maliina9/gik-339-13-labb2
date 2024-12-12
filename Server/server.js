const express = require('express');
const server = express();

server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');

        next();
    })

server.get('/', (req, res) => {
    const method = req.method;
    const url = req.url;
    res.send(`Du gjorde en ${method} - förfrågan till url:en ${url}`);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});