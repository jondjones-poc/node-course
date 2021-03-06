const env = process.env.NODE_ENV || 'development';
console.log('ENV = ', env);

if (env === 'development' || env === 'test') {
    const config = require('./config.json');
    const envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
        console.log(`Adding key = ${key} with value ${envConfig[key]}`);
    });
}