const passport = require('passport');
const LocalStrategy = require('passport-local');
const {zooUser} = require('../models');

passport.use(new LocalStrategy(
    function verify(email, password, done) { 
      console.log('HELLO123');
      console.log({email, password});
        // tried this: passReqToCallback: false, usernameField: 'email'
        // (timing out here because it can't find table)
        console.log({zooUser});
      zooUser.findOne({where: {"email": email} })
      .then((user)=>{
        return done(null, user);
      } 
      )
    }
  ));



  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });



  module.exports = passport