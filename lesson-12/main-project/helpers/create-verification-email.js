const { BASE_URL } = process.env

const createVerificationEmail = (verificationCode, email) => {
    const link = `http://${BASE_URL}/api/auth/verify?code=${verificationCode}`

    const verificationEmail = {
        to: email,
        subject: 'Verifcation',
        html: `<a target="_blank" href="${link}">Verify</a>`
    }

    return verificationEmail;
}

module.exports = createVerificationEmail