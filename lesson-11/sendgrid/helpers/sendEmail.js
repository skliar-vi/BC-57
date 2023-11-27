const sendgrid = require("@sendgrid/mail")
require('dotenv').config()

const { SENDGRID_API_KEY, MAIL_USER } = process.env

sendgrid.setApiKey(SENDGRID_API_KEY)

const sendEmail = async (data) => {
    const email = { ...data, from: MAIL_USER }

    await sendgrid.send(email)

    return true
}

module.exports = sendEmail
