const bcrypt = require('bcrypt');

const db = require('../db');
const jwt = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = db.findByEmail(email);
    if (existingUser) {
      res.status(400);
      next(new Error('Email is already in use'));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = db.create(email, hashedPassword);

    const payload = {
      id: user.id,
    };
    const token = jwt.generateJwt(payload);

    res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = db.findByEmail(email);
    if (!user) {
      res.status(400);
      next(new Error('Wrong credentials'));
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400);
      next(new Error('Wrong credentials'));
      return;
    }

    const payload = {
      id: user.id,
    };
    const token = jwt.generateJwt(payload);

    res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};
