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
        console.log('line13')
        const user = await User.findOne({ where: { email } });
        if (!user || !user.checkPassword(password)) {
          console.log('line16')
          return done(null, false, { message: "Incorrect email or password." });
        }
        console.log('line18')
        return done(null, user);
      } catch (err) {
        console.log('line21')
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
