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
                      .findOneAndDelete({
                        text: 'Drink Tequilla'
                      })
                      .then((result) => {
                        console.log('Deleting Todos', result);
                      }, (err) => {
                        if (err) {
                          console.log('Unable to delete todos', error);
                        }
                      });           
  client.close();
});
