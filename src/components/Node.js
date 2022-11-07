// import mongoose from "mongoose";
// const mongoose = require("mongoose");
// import bodyParser from "body-parser";
// const bodyParser = require("body-parser");
// import express from "express";
// import React from "react";
// import App from "./App";
// const React = require("react");
// const App = require("./App");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({origin: true, credentials: true}));
// app.use(bodyParser.urlencoded({extended: true}));


// mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewUrlParser: true});
// const keeperSchema = new mongoose.Schema({
//   title: String,
//   content: String
// });
// const Keep = mongoose.model("Keep",keeperSchema);


app.get("/msg",function(req,res){
  res.send({ message: "Hello from server!" });
})

app.listen(400,function(){
  console.log("successfully ran");
})