// const sendgrid = require("@sendgrid/mail")
// require('dotenv').config()

// const { SENDGRID_API_KEY, MAIL_USER } = process.env

// sendgrid.setApiKey(SENDGRID_API_KEY)

const email = {
    to: "cihiva1190@nexxterp.com",
    // from: MAIL_USER,
    subject: "I can send emails",
    html: "<b>My first email from sendgrid</b>"
}

// sendgrid.send(email).then(() => console.log('Email sent successfully'))

const { sendEmail } = require('./helpers')


sendEmail(email).then(() => console.log('Email sent successfully'))