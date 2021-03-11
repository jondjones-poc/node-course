const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {

    const users = [ { name: 'jon', age: 4 }, {name: 'steve', age: 10 } ]
    res.send(users);
});

app.get('/notfound', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'my Page'
    })
});

app.listen(3000);
module.exports.app = app;
