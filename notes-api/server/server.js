const config = require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose')
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: false,
        _createdBy: req.user._id
    });

    try {
        const doc = await newTodo.save();
        return res.send(doc);
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    };
});

app.get('/todos', authenticate, async (req, res) => {
    try {
        const todos = await Todo.find({
            _createdBy: req.user._id
        });
        return res.send({todos});
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    };
});

app.get('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Todo ID Is Not Valid');
    }

    try {
            const todo = await Todo.findOne({
                                _id: id,
                                _createdBy: req.user._id});

            if (todo) {
                return res.send({todo});
            };

            return res.status(404).send('No Notes Exist');
    } catch (e) {
        return res.status(400).send('Error getting result', e);
    };
});

app.delete('/todos/:id',  authenticate, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Todo ID Is Not Valid');
    };

    try {
            const todo = await Todo.findOneAndRemove({
                                _id: id,
                                _createdBy: req.user._id 
                                });

            if (todo) {
                return res.send({todo});
            }
            return res.status(404).send('Note does not exist');
    } catch (e) {
        return res.status(400).send('Error trying to delete todo', e);
    };
});

app.patch('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Todo ID Is Not Valid');
    }
    console.log('id:', id);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    try {
        const todo = await Todo.findOneAndUpdate({
            _id: id,
            _createdBy: req.user._id
        } , {
            $set: body
        }, {
            new: true });

        if (todo) {
            console.log('Found match ', todo);
            return res.send({todo});
        }
        return res.status(404).send('Note does not exist');
    } catch (e) {
        console.log(e);
                return res.status(400).send(e);
    };
});

// /Users
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const newUser = new User(body);
    console.log(newUser);
    
    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }, (e) => {
        console.log(e);
        return Promise.reject('Unable to save user');
    }).then((token) => {
        return res.header('X-auth', token).send(newUser);
    }).catch((e) => {
        return res.status(400).send(e);
    })
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send({users});
    } catch (e) {
        res.status(400).send(e);
    };
});

app.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('X-auth', token).send(user);
    } catch (e) {
        res.status(400).send('Cant Log-in');
    };
})

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen( port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};