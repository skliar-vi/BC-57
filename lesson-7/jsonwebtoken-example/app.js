const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env

const payload = {
    id: '654a79644e4d5b6cec04c11c'
}

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" })

console.log(token);
console.log(jwt.decode(token))

try {
    const data = jwt.verify(token, SECRET_KEY)

    console.log(data);

} catch (err) {
    console.log(err.message);
}
