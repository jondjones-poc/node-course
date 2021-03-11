const request = require('request');

const getWeather = (lat,lng) => {
    return new Promise((resolve, reject) => {
        const settings = {
            url: `https://api.darksky.net/forecast/974a40e018d8059da8e3413757266944/${lat},${lng}`,
            json: true
        };

        request(settings, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve({
                    temperature: body.currently.temperature,
                    summary: body.currently.summary});
            } else {
                reject('Unable to connect to weather service');
            }
        });
    });
};

module.exports.getWeather = getWeather;