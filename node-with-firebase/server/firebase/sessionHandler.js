const uuid = require('uuid');
const { database } = require('../firebase/firebase');
const { getSessionRoute, getUserRoute, getAllRoute } = require('../firebase/firebasePaths');

const addSession = (userId, data) => {
        database.ref(getSessionRoute(userId, uuid()))
            .set(data)
            .then()
            .catch((e) => console.log(e));
};

const getUserSession = (userId) => {
    return database.ref(getUserRoute(userId))
        .once("value")
        .then((data) => {
            var returnArr = [];

            data.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                returnArr.push(item);
            });
        
            return returnArr;
        })
        .catch((e) => console.log(e));
};

const getAllSessions = () => {
    return database.ref(getAllRoute())
        .once("value")
        .then((data) => {
            var returnArr = [];

            data.forEach(function(childSnapshot) {
                var items = childSnapshot.val();

                Object.keys(items).map(function(key) {
                    items[key].uuid = uuid();
                    returnArr.push(items[key]);
                });
            });

            return returnArr;
        })
        .catch((e) => console.log(e));
};

module.exports = { addSession, getUserSession, getAllSessions };