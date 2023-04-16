require("dotenv").config();
const findOrCreate = require("mongoose-findorcreate");
const {Signup} = require("./database");

const GoogleStrategy = require('passport-google-oauth20').Strategy;


function googleAuth(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
        scope: ['profile']
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        Signup.findOrCreate({ googleId: profile.id },{name: profile.displayName}, function (err, user) {
          return cb(err, user);
        });
      }
    ));
}

module.exports = googleAuth;


