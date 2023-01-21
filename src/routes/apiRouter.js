const express = require('express');

const authRouter = require('./authRouter');
const contactsRouter = require('./contactsRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/contacts', contactsRouter);

module.exports = router;
