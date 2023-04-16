
const mongoose = require("mongoose");
const {Keep, Signup} = require("./database");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const { Password } = require("@mui/icons-material");
const bcrypt = require("bcrypt");
const saltRounds = 10; 
const passportInit = require("./LocalAuth.js");
const googleAuth = require("./googleAuth");

//requiring for authentication, cookies & Sessions
const session = require("express-session");
const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");


// app.use(cors({origin: true, credentials: true}));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true
  })
);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewUrlParser: true});

//Schema and Model for Keeper App
// const keeperSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: false
//   },
//   content: {
//     type: String,
//     required: false
//   }
// });



// const Keep = mongoose.model("Keep",keeperSchema);



//Schema and Model for SignUp/Login Id Psw
// const SignupSchema = new mongoose.Schema({
//   name: { type: String, required: true},
//   username: { type: String, required: true },
//   password: { type: String, required: true }
// })

// SignupSchema.plugin(passportLocalMongoose);

// const Signup = mongoose.model("Signup",SignupSchema);


// passport.use(Signup.createStrategy());
passportInit(passport);
googleAuth(passport);
// passport.serializeUser(Signup.serializeUser());
// passport.deserializeUser(Signup.deserializeUser());

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    // console.log(req.user);
    // res.send(req.user);
    next();
  }
}


app.get("/",function(req,res){
  Keep.find( (err, memos) => {
    res.send(memos);
  } )
})


//API for react page to fetch data from here
app.get("/msg/:id",function(req,res){
  // console.log(req.params.id);
  Keep.find({owner: req.params.id}, (err, memos) => {
    if(err){
      res.send(err);
      console.log(err);
    }else{
      // console.log(memos);
      res.send(memos);
    }
  
  } )
})


//posting new note in Keeper app
app.post("/msg",(req,res) => {

  const bods = req.body.body;

  if(bods.title !== "" || bods.content !== ""){
    const datum = new Keep({
      title : bods.title,
      content : bods.content,
      owner: bods.owner
    })
    datum.save();

    
  }

  console.log(bods);
  res.send("ok");
});


//for login data

// Idea 1
// app.post("/login",(req,res) => {

//   const user = new Signup({
//     username: req.body.body.username,
//     password: req.body.body.password
//   })
//   console.log(user);
//   console.log(req.body)

//   try{
//     req.login(user, function(err){
//       if (!err) {
//         passport.authenticate("local",(err,users,info) => {
//       if(err) throw err;
//       if(!users) res.send({message: "user doesnot exist."});
//       else{
//         res.send({message: "logged in."});
//       }
//     })
//       } else {
//         res.send({message: "bhayena"});
//         // window.alert("Something went wrong! Please try again");
//       }
//     })


//   }
//   catch(err){
//     res.send({message: err + "login error"})
//     // console.log(err + "login error");
//   }

  
// })


// Idea 2
app.post('/login', passport.authenticate('local'), 
 function(req, res) {
	// res.send("logged in from first file.");
  //may be 
  console.log(req.user);
    res.send(req.user);
    
    // console.log("logged in from first file");
}
);


//Idea 3
// app.post("/login",(req, res, next) => {

//     const user = new Signup({
//     username: req.body.body.username,
//     password: req.body.body.password
//   })
//   console.log(user);
//   // const username = req.body.body.email;
//   try {
//     passport.authenticate("local",
//     (err,users,info) => {
//       if(err) throw err;
//       if(!user) console.log("user doesnot exist.");
//       else{
//         req.login(users, err => {
//           if(err) {
//             // throw err;
//             console.log("login failed");
//           }
//           console.log(req.user);
//           console.log("succefully authenticated and logged in too");
//         })
//       }
//     }
//     // {successMessage: "login data sent.", failureMesssage: "login failed."}
//     )
//     // ,{successRedirect:"/login", failureRedirect:"/"}
    
//   } catch (error) {
//     console.log(err + "authentication not sent");
//   }


// } 
// )


// app.get("/login", (req,res) => {
//   if(req.isAuthenticated){
//     res.send("App");
//   }else{
//     res.send("Login");
//     // window.alert("you are not logged in");
//   }
// })




//for new user registration
app.post("/register",(req,res) => {
  Signup.findOne({username: req.body.body.username}, (err,found) => {
    if(err){
      window.alert("Something went wrong! Please try again");
    }else{
      if(!found){
        // console.log(req.body.body.name);
        // console.log(req.body.body.username);
        // console.log(req.body.body.password);

       bcrypt.hash(req.body.body.password,saltRounds,(err,hash) => {
          const newId = new Signup({
            name: req.body.body.name,
            username: req.body.body.username,
            password: hash
          })
          newId.save().then(() => {
            console.log("saved");
            res.send({message: "signup done be"});
         })
         .catch((err) => {
          console.log("saving failed");
           console.log(err);
           res.send({message: "signup error"});
         });
        })
       
      //   .then(() => {
      //     // console.log(req.body.body.email);
      //     passport.authenticate("local")(req,res, function() {
      //      //redirect to login page
      //      res.redirect("/login");
      //    })
      //  })
      //  .catch((err) => {
      //    console.log(err);
      //  });
   
        
        // Signup.register({username: req.body.body.email},
        //   req.body.body.password, (err,user) => {
        //     if(!err){
        //       // console.log(req.body.body.email);
        //       passport.authenticate("local")(req,res, function() {
        //         //redirect to login page
        //         res.redirect("/login");
        //       })
        //     }else{
        //       // window.alert("Something went wrong! Please try again");
        //       console.log("Something went wrong! Please try again")
        //     }
        //   } )
      }else{
        // window.alert("This email is already used!");
      }
    }
  })
})


//to delete the note from Keeper app
app.delete("/msg/:id",(req,res) => {
  const id = req.params.id;
  console.log(id);
  Keep.findByIdAndDelete({_id: id}, (err) => {
    if(!err){
      console.log("deleted");
    }
  })
})

// module.exports = {Signup};


//google authentication------------------------------------------
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("success in gAuth.");
    res.redirect('http://localhost:3000/keeper');
    // res.send(req.user);
  });


app.listen(8080,function(){
  console.log("successfully ran");
})

//passReqToCallback