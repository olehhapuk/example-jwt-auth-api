const express = require('express');
const Chance = require('chance');

const { auth } = require('../middlewares');

const router = express.Router();

router.get('/', auth, (req, res) => {
  const chance = new Chance();

  const contacts = [];
  for (let i = 0; i < 12; i++) {
    const contact = {
      id: i + 1,
      fullName: chance.name(),
      age: chance.age(),
      avatar: chance.avatar(),
      email: chance.email(),
    };
    contacts.push(contact);
  }

  res.json(contacts);
});

module.exports = router;
