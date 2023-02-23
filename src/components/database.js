const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewUrlParser: true});

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

const SignupSchema = new mongoose.Schema({
    name: { type: String, required: true},
    username: { type: String, required: true },
    password: { type: String, required: true }
  })

  SignupSchema.plugin(passportLocalMongoose);

  const Signup = mongoose.model("Signup",SignupSchema);

module.exports = {Keep, Signup};