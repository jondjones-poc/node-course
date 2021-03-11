const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const mySalt = "mysalt";
const data = {
    id: 4
};

const password = 'password';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(`bcrypthash:${hash}`);
    })
});

const hashedPassword = '$2a$10$3XxnfdyfT7VJpyqoz2Ns.e7TknG8J6NZGOUXqoMJYPySjHiZFfuWq';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(`bcryptcompare:${res}`);
});

const jsonToken = jwt.sign(data, mySalt);
console.log(`jsonToken:${jsonToken}`);

const decoded = jwt.verify(jsonToken, mySalt);
console.log('decoded', decoded);

// CryptoJs
const message = 'I am a message';
const hash = SHA256(message).toString();

console.log(`message:${message}`);
console.log(`hash:${hash}`);

const token = {
    data, 
    hash: SHA256(JSON.stringify(data) + mySalt).toString()
}

const resulthash = SHA256(JSON.stringify(token.data) + mySalt).toString();

if (resulthash === token.hash){
    console.log('Result wasnt change');
} else {
    console.log('Warning data changed');
}