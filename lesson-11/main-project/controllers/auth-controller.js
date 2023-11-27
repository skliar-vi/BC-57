const { HttpError, sendEmail, createVerificationEmail } = require('../helpers');
const { User } = require('../models/user')
const { errorHandler } = require('../utils')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY, BASE_URL } = process.env
const { nanoid } = require('nanoid')

const signup = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'User with provided email is already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationCode = nanoid()

    const newUser = await User.create({ ...req.body, password: hashedPassword, verificationCode })

    sendEmail(createVerificationEmail(verificationCode, email))

    res.status(201).json({
        user: newUser
    })
}

const verify = async (req, res) => {
    const { code } = req.query

    const user = await User.findOne({ verificationCode: code })

    if (!user) {
        throw HttpError(401)
    }

    await User.findByIdAndUpdate(user._id, { verifiedAt: new Date().toDateString(), verificationCode: null })

    res.json({
        message: "Email verified successfully"
    })
}

const resendVerificationEmail = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email, verificationCode: { $ne: null } })

    if (!user) {
        throw HttpError(401)
    }

    if (user.verifiedAt) {
        throw HttpError(401, "You are already verified")
    }

    await sendEmail(createVerificationEmail(user.verificationCode, email))

    res.json({
        message: "Email resend successfully"
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email, verifiedAt: { $ne: null } })

    if (!user) {
        throw HttpError(401, 'Invalid credentials')
    }

    const compareResult = await bcrypt.compare(password, user.password)

    if (!compareResult) {
        throw HttpError(401, 'Invalid credentials')
    }

    const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "8h" });

    await User.findByIdAndUpdate(user._id, { token: accessToken })

    res.json({
        accessToken,
        user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
    })
}

const getProfile = async (req, res, next) => {
    const { firstname, lastname, email } = req.user;

    res.json({
        firstname,
        lastname,
        email,
    })
}

const logout = async (req, res, next) => {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: '' })

    res.json({
        message: "Logout success"
    })
}

module.exports = {
    signup: errorHandler(signup),
    signin: errorHandler(signin),
    getProfile: errorHandler(getProfile),
    logout: errorHandler(logout),
    verify: errorHandler(verify),
    resendVerificationEmail: errorHandler(resendVerificationEmail)
}