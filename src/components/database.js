const mongoose = require("mongoose");

// mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewUrlParser: true});

const keeperSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Signup"
    // },

    //   timestamps: true,
    //   toJSON: {virtuals: true}
  });

  const Keep = mongoose.model("Keep",keeperSchema);



module.exports = {Keep};