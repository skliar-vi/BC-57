const Joi = require('joi')

const bookSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required"
    }),
    author: Joi.string().required(),
})

module.exports = { bookSchema }