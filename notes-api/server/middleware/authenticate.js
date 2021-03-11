const {User} = require('../models/user');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');
    console.log(`Authenicating x-auth:${token}`);

    User.findByToken(token).then((user) => {
        if (!user) {
            console.log('Cant find user token');
            return Promise.reject();
        }
        console.log(`Found user ${user.email}`);
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        return res.status(401).send();;
    });
}

module.exports = { authenticate };