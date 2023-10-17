// const { users } = require('./users')

// console.log(users)

// const nodemon = require('nodemon')
// console.log(nodemon)
// const { getCurrentMonth, isLeapYear } = require('./date')

// console.log(getCurrentMonth())
// console.log(isLeapYear())
import { users } from './users.mjs'
import { getCurrentMonth, isLeapYear } from './date/index.mjs';

console.log(users.admins);
console.log(getCurrentMonth());
console.log(isLeapYear());