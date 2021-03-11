const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Heroku Port Set-up
const port = process.env.PORT|| 3000;

var app = express();
hbs.registerPartials(__dirname + '/partials');
app.set('view engine', hbs);

app.use((req, res, next) => {
    const now = new Date().toDateString();
    const log = `${now}: ${req.method}: ${req.url}\n`;

    fs.appendFile('server.log', log, (error) => {
        if (error) {
            console.log(error);
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpper', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        description: 'Welcome to this site',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Project Page',
    });
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page'
    });
});


const personObject = {
    firstname: 'jon',
    surname: 'jones'
};

app.get('/api/people', (req, res) => {
    res.send(personObject);
});

app.listen(port, () => {
    console.log(`Server is up and port ${port}`);
});