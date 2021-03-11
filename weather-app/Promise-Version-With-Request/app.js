const yargs = require('yargs');
const geocode = require('./geoCode');
const weather = require('./weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch te weather',
            string: true
        }
    })
    .help()
    .alias( 'help','h')
    .argv;

geocode.geocodeAddress(argv.address)
.then((geocodeData) => {
    weather.getWeather(geocodeData.latitude, geocodeData.longitude)
    .then((weatherData) => { 
        console.log(`It's ${weatherData.summary} with a temperature ${weatherData.temperature} `)
    }).catch((weatherErrorMessage) => {
        console.log(weatherErrorMessage);
    });
}).catch((geocodeErrorMessage) => {
    console.log(geocodeErrorMessage);
});