const { ExtractJwt, Strategy } = require('passport-jwt');

const db = require('../../db');

module.exports = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = db.findById(payload.id);
      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
