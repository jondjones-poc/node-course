const request = require('request');

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {


        request.post(settings, (error, response, body) => {
            if (error) {
                reject(JSON.stringify(error, undefined, 2));
            } 
            else if (body.status === 'OVER_QUERY_LIMIT') {
                reject('Ran Out Of Credits');
            } 
            else if (body.status === 'ZERO_RESULTS') {
                reject('No address found');
            } 
            else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        });
    })
};

module.exports.geocodeAddress = geocodeAddress;