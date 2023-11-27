// const nodemailer = require('nodemailer')
// require('dotenv').config()

// const { MAIL_HOST, MAIL_USER, MAIL_PORT, MAIL_PASSWORD } = process.env

// const nodemailerConfig = {
//     host: MAIL_HOST,
//     // port: 465, // ssl - secure,
//     // secure: true,
//     port: MAIL_PORT, // tls - not secure
//     auth: {
//         user: MAIL_USER,
//         pass: MAIL_PASSWORD,
//     }
// }

// const tranposter = nodemailer.createTransport(nodemailerConfig)

const email = {
    to: "cihiva1190@nexxterp.com",
    // from: MAIL_USER,
    subject: "Welcome to GoIT",
    html: "<b>My first email</b>"
}

// tranposter.sendMail(email).then(() => console.log('Email sent successfully'))

const { sendEmail } = require('./helpers')

sendEmail(email).then(() => console.log('Email sent successfully'))