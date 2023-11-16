const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth-controller');
const { validateBody } = require('../../utils');
const { shemas: { registrationSchema, signInSchema } } = require('../../models/user');
const { authenticate } = require('../../middlewares');

router.post('/register', validateBody(registrationSchema), authController.signup)
router.post('/login', validateBody(signInSchema), authController.signin)
router.get('/profile', authenticate, authController.getProfile)
router.post('/logout', authenticate, authController.logout)

module.exports = router;