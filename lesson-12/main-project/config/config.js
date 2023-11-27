// const { config } = require('dotenv')
// config()
const path = require('path')
require('dotenv').config()
const Joi = require('joi')

const envsSchema = Joi.object().keys({
    DB_HOST: Joi.string().required(),
    PORT: Joi.number(),
    SECRET_KEY: Joi.string().required(),
    DB_HOST_TEST: Joi.string(),
}).unknown()

const { value, error } = envsSchema.validate(process.env)

if (error) {
    throw new Error(error.message)
}

module.exports = {
    dbHost: value.DB_HOST,
    port: value.PORT,
    secretKey: value.SECRET_KEY,
    dbHostTest: value.DB_HOST_TEST
}