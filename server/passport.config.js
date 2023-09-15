require("dotenv").config();

const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

const User = require("./models/User");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    try {
      const { id } = payload;
      const user = await User.findById(id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

module.exports = passport;
