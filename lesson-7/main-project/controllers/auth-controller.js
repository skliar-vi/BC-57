const { HttpError } = require('../helpers');
const { User } = require('../models/user')
const { errorHandler } = require('../utils')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const signup = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'User with provided email is already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ ...req.body, password: hashedPassword })

    res.status(201).json({
        user: newUser
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw HttpError(401, 'Invalid credentials')
    }

    const compareResult = await bcrypt.compare(password, user.password)

    if (!compareResult) {
        throw HttpError(401, 'Invalid credentials')
    }

    const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "8h" });

    res.json({
        accessToken,
        user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
    })
}


module.exports = {
    signup: errorHandler(signup),
    signin: errorHandler(signin),
}