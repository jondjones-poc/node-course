const moment = require('moment');

const date = new Date();
console.log(date.getMonth());

const momentDate = moment();
console.log(momentDate.format('MMM YYYY'));
console.log(momentDate.format('D0'));

const newDate = momentDate.add(100, 'year').subtract(9, 'months');
console.log(newDate.format('MMM YYYY'));