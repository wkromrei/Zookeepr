const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user || !user.checkPassword(password)) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user.id);
  });
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);
    cb(null, user);
  } catch (err) {
    cb(err, null);
  }
});
