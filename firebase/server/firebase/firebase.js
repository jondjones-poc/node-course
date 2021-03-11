const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBMAABgbWbJyXK0FKw47wKwXekX5YThtAc",
    authDomain: "toned-c6f28.firebaseapp.com",
    databaseURL: "https://toned-c6f28.firebaseio.com",
    projectId: "toned-c6f28",
    storageBucket: "toned-c6f28.appspot.com",
    messagingSenderId: "1028459505260"
  };
  
  firebase.initializeApp(config);
  const database = firebase.database();

  module.exports = {firebase, database };