const { ObjectID } = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

const id = '5b0fac8eff64510a45b43e91';
const idThatDoesntExist = '6b0fac8eff64510a45b43e91';
const invalidId = '6b0fac8eff64510a45b43e91fhhh';

Todo.find().then((todos) => {
    console.log('All Todos');
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todos) => {
    console.log('Find One Todo');
    console.log('Todos', todos);
});

Todo.findById(id)
.then((todo) => {

    if (!todo) {
        return console.log('Id Not Found');
    };
    console.log('Find By Id');
    console.log('Todos', todo);
});

Todo.findById(idThatDoesntExist)
.then((todo) => {
    if (!todo) {
        return console.log('Id Not Found');
    };
});

if (!ObjectID.isValid(invalidId)) {
    Todo.findById(invalidId)
    .then((todo) => {
        if (!todo) {
            return console.log('Id Not Found');
        };
    });
} else {
    return console.log('Id Not Valid');
}
