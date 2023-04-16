const LocalStrategy = require("passport-local").Strategy;
const {Keep, Signup} = require("./database");
const bcrypt = require("bcrypt");
// const passport = require("passport");

//this may be for just logging in but not for registration
function passportInit(passport){
  console.log("reached to local strategy page");
    passport.use( new LocalStrategy(
        function(username, password, done) {
            console.log("reached to local authentication phase");
            Signup.findOne({ username: username }, function (err, user) {
            if (err) { console.log("signup data error " + err); return done(err); }
            if (!user) { console.log("user doesnot exist"); return done(null, false); }
            // if (user.password != password) {
            //     return done(null, false);
            // }
            bcrypt.compare(password,user.password,(err,result) => {
              if(err) throw err;
              if(result === true) {
                console.log("verified");
                return done(null, user);
              }else{
                console.log("not verified");
                return done(null, false);
              }
            })
            // if(!bcrypt.compare(password,user.password)){
            //   console.log("not verified"); return done(null, false);
            // }
            // if (!user.verifyPassword(password)) { console.log("not verified"); return done(null, false); }
            // console.log("verified");
            // return done(null, user);
          });
        }
      ));

      // used to serialize the user for the session
      passport.serializeUser(function(user, done) {
         done(null, user.id); 
      // where is this user.id going? Are we supposed to access this anywhere?
      });
 
     // used to deserialize the user
       passport.deserializeUser(function(id, done) {
        Signup.findById(id, function(err, user) {
           done(err, user);
         });
       });
}

module.exports = passportInit;
