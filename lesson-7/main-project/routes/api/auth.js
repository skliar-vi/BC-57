const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth-controller');
const { validateBody } = require('../../utils');
const { shemas: { registrationSchema, signInSchema } } = require('../../models/user')

router.post('/register', validateBody(registrationSchema), authController.signup)
router.post('/login', validateBody(signInSchema), authController.signin)


module.exports = router;