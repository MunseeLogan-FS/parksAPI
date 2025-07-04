const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/Users");
const config = require("../config");

const localOptions = {
  usernameField: "email",
};
const localStrategy = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
});

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
};

const jwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if (err) return done(err, false);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localStrategy);
passport.use(jwtStrategy);
