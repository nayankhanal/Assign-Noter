const mongoose = require("mongoose");


const keeperSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }

  });

  const Keep = mongoose.model("Keep",keeperSchema);



module.exports = {Keep};