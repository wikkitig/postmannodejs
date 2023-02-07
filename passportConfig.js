const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/userSchema");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "mobilenumber", passwordField: "password" },
      (mobilenumber, password, done) => {
        User.findOne({ mobilenumber: mobilenumber }, (err, user) => {
          console.log(err);
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      const userDetails = {
        user: user,
      };
      done(err, userDetails);
    });
  });
};
