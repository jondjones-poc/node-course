const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURI(argv.address);
const encodedUrl = `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(encodedUrl).then((response) => {
    if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('Google Ran Out Of Credits');
    } else if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('No address found');
    } 

    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const darkskyUrl = `https://api.darksky.net/forecast/974a40e018d8059da8e3413757266944/${lat},${lng}`;
    
    axios.get(darkskyUrl).then((response) => {
        const temperature = response.data.currently.temperature;
        const summary = response.data.currently.summary;

        console.log(`It's ${summary} with a temperature ${temperature} `)
    });
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API');
    } else {
        console.log(e.message);
    }
});