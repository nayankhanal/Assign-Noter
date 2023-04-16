const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

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
    ,owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Signup"
    },
    //   timestamps: true,
    //   toJSON: {virtuals: true}
  });

  const Keep = mongoose.model("Keep",keeperSchema);

const SignupSchema = new mongoose.Schema({
    name: { type: String, required: true},
    username: { type: String},
    password: { type: String},
    googleId: {type: String, unique: true}
  })

  SignupSchema.plugin(passportLocalMongoose);
  SignupSchema.plugin(findOrCreate);

  const Signup = mongoose.model("Signup",SignupSchema);

module.exports = {Keep, Signup};