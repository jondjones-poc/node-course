const config = require('./config/config');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const { addSession, getUserSession, getAllSessions } = require('./firebase/sessionHandler');

const port = process.env.PORT;
console.log(port);

// Configure express
var app = express();

var corsOptions = {
    origin: 'https://www.theoutnet.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// APIS
app.post('/event', async (req, res) => {
    const id = req.body.user_Id;

    if (!id) {
        return res.status(404).send('User ID Is Not Valid');
    }

    addSession(id, req.body);
    return res.send(req.data);
});

app.get('/events/', async (req, res) => {
    getAllSessions().then((data) => {
        console.log(data);
        return res.send(data);
    }).catch((e) => {
        console.log(e);
    });
});

app.get('/eventbyid/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).send('User ID Is Not Valid');
    }

    getUserSession(id).then((data) => {
        console.log(data);
        return res.send(data);
    }).catch((e) => {
        console.log(e);
    });
});

app.get('/test', async (req, res) => {
    return res.send('hello');
});

// Start server
app.listen( port, () => {
    console.log(`Started on port ${port}`);
});
