const express = require('express');

const authController = require('../controllers/authController');
const { auth, schemaValidate } = require('../middlewares');
const usersValidators = require('../validationSchemas/users');

const router = express.Router();

router.post(
  '/register',
  schemaValidate(usersValidators.registerSchema),
  authController.register
);
router.post(
  '/login',
  schemaValidate(usersValidators.registerSchema),
  authController.login
);
router.get('/me', auth, authController.getMe);
router.post('/logout', auth, authController.logout);

module.exports = router;
