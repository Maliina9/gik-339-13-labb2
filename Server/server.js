const express = require('express');
const server = express();
const sqlite3 = require('sqlite3').verbose();

server.use(express.json()).use(express.urlencoded({ extended: false}));

server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');

        next();
    });

    server.get('/users', (req, res) => {
        const db = new sqlite3.Database('gik339-labb2.db');
        const sql = 'SELECT * FROM users';
        
        db.all(sql, (err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(rows);
            }
        });
    
        db.close();
    });

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});