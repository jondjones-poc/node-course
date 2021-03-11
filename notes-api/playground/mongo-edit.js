const { MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db= client.db('TodoApp');

  db.collection('Todos')
                      .deleteMany({
                        text: 'Drink Tequilla'
                      })
                      .then((result) => {
                        console.log('Deleting Todos', result);
                      }, (err) => {
                        if (err) {
                          console.log('Unable to delete todos', error);
                        }
                      });                  

  db.collection('Todos')
                      .findOneAndUpdate({
                        _id: new ObjectID('5b0d5c4eddba4971415192f8')
                      }, {
                        $set: {
                          completed: false
                        }
                      }, {
                        returnOriginal: false
                      })
                      .then((result) => {
                        console.log('Edited result to ', result);
                      }, (err) => {
                        if (err) {
                          console.log('Unable to delete todos', error);
                        }
                      });           
  client.close();
});
