
const mongoose = require("mongoose");
const {Keep} = require("./database");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const { Password } = require("@mui/icons-material");


//requiring for authentication, cookies & Sessions
const session = require("express-session");


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



mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewUrlParser: true});



app.get("/msg",function(req,res){
  Keep.find( (err, memos) => {
    res.send(memos);
  } )
})





//posting new note in Keeper app
app.post("/msg",(req,res) => {

  const bods = req.body.body;
  try {
    if(bods.title !== "" || bods.content !== ""){
      const datum = new Keep({
        title : bods.title,
        content : bods.content
        // owner: bods.owner
      })
      datum.save();
      
    }
  } catch (error) {
    console.log(err);
  }



  console.log(bods);
  res.send("ok");
});




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


app.listen(8080,function(){
  console.log("successfully ran");
})

