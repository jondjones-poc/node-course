const { MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db= client.db('TodoApp');

  db.collection('Users').insertOne({
    name: 'Jon',
    age: 25,
    location: 'Philadelphia'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});
