const nodemailer = require('nodemailer')
require('dotenv').config()

const { MAIL_HOST, MAIL_USER, MAIL_PORT, MAIL_PASSWORD } = process.env

const nodemailerConfig = {
    host: MAIL_HOST,
    // port: 465, // ssl - secure,
    // secure: true,
    port: MAIL_PORT, // tls - not secure
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    }
}

const tranposter = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
    const email = { ...data, from: MAIL_USER };

    await tranposter.sendMail(email)

    return true
}

module.exports = sendEmail
