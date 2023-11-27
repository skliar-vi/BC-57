const { MAIL_USER, SENDGRID_API_KEY } = process.env
const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(SENDGRID_API_KEY)

const sendEmail = async (emailData) => {
    await sendgrid.send({ ...emailData, from: MAIL_USER })

    return true;
}

module.exports = sendEmail