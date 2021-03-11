const moment = require('moment');

const generateMessge = (from, text) => {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    };
};   

const generateLocationMessge = (from, lat, lng) => {

    const url = `https://www.google.com/maps/?q=${lat},${lng}`;

    return {
        from: from,
        url: url,
        createdAt: moment().valueOf()
    };
};   

const getUser = (from) => {
    let username;

    if (from) {
        username = from; 
    } else {
        username = 'Unknown User';
    }

    return username;
}

module.exports = {generateMessge, generateLocationMessge, getUser};