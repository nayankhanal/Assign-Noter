
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewUrlParser: true});
const keeperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  }
});
const Keep = mongoose.model("Keep",keeperSchema);


app.get("/",function(req,res){
  Keep.find( (err, memos) => {
    res.send(memos);
  } )
})

app.get("/msg",function(req,res){
  Keep.find( (err, memos) => {
    if(err){
      res.send(err);
      console.log(err);
    }else{
      res.send(memos);
    }
    
  } )
})

app.post("/msg",(req,res) => {

  const bods = req.body.body;

  if(bods.title !== "" || bods.content !== ""){
    const datum = new Keep({
      title : bods.title,
      content : bods.content
    })
    datum.save();

    
  }

  console.log(bods);
  res.send("ok");
});

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