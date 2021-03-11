const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

// consts
const auth = 'auth';
const salt = 'mySalt';
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

// todo test data setup
const todos = [{
        _id: new ObjectID(),
        text: 'first',
        _createdBy: userOneId
    }, {
        _id: new ObjectID(),
        text: 'second',
        completed: true,
        completedAt: 1,
        _createdBy: userTwoId
    }, {
        _id: new ObjectID(),
        text: 'third',
        _createdBy: userOneId
    }];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
};

// user test data set-up
const users = [{
        _id: userOneId,
        email: 'first@first.com',
        password: 'passwordOne',
        tokens: [{
            access: auth,
            token: jwt.sign({_id: userOneId, access: auth}, salt).toString()
        }]
    }, {
        _id: userTwoId,
        email: 'second@second.com',
        password: 'passwordTwo',
        tokens: [{
            access: auth,
            token: jwt.sign({_id: userTwoId, access: auth}, salt).toString()
        }]
    }];

const populateUsers = (done) => {
    User.remove({}).then(() => {

        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {todos, populateTodos,users,populateUsers};