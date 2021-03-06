module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
};

module.exports.square = (x) => x * x;

module.exports.asyncSquare = (a, callback) => {
    setTimeout(() => {
        callback(a * a);
    }, 1000);
};

module.exports.setName = (user, fullName) => {
    var names = fullName.split(' ');

    user.firstname = names[0];
    user.surname = names[1];

    return user;
};