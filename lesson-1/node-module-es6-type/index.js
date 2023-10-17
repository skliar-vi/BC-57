// const { users } = require('./users')

// console.log(users)

// const nodemon = require('nodemon')
// console.log(nodemon)
// const { getCurrentMonth, isLeapYear } = require('./date')

// console.log(getCurrentMonth())
// console.log(isLeapYear())
import { users } from './users.js'
import { getCurrentMonth, isLeapYear } from './date/index.js';

console.log(users.admins);
console.log(getCurrentMonth());
console.log(isLeapYear());