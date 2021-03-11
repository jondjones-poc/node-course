const { MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db= client.db('TodoApp');

  db.collection('Todos')
                      .find({
                        _id: new ObjectID('5b0d5c50ddba4971415192f9')
                      })
                      .toArray()
                      .then((docs) => {
                        console.log('Fetching Todos');
                        console.log(JSON.stringify(docs, undefined, 2));
                      }, (err) => {
                        if (err) {
                          console.log('Unable to fetch todos', error);
                        }
                      });

  db.collection('Todos')
                      .find()
                      .count()
                      .then((count) => {
                        console.log(`Todos Count ${count}`);
                      }, (err) => {
                        if (err) {
                          console.log('Unable to fetch todos', error);
                        }
                      });

  db.collection('Users')
                      .find({
                        name: 'Jon'
                      })
                      .toArray()
                      .then((docs) => {
                        console.log('Fetching Results');
                        console.log(JSON.stringify(docs, undefined, 2));
                      }, (err) => {
                        if (err) {
                          console.log('Unable to fetch todos', error);
                        }
                      });                      

  client.close();
});
