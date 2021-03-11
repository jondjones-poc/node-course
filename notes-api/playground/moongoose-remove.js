const { ObjectID } = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

const id = '5b0fac8eff64510a45b43e91';
const idThatDoesntExist = '6b0fac8eff64510a45b43e91';
const invalidId = '6b0fac8eff64510a45b43e91fhhh';

Todo.remove({}).then((todos) => {
    console.log('Removing All Todos');
});

Todo.findByIdAndRemove(id).then((result) => {
    console.log(`Deleting ${id}`);
}).catch((e) => {
    if (e) {
        console.log('Error Deleting Todo becasue ', e)
    }
});