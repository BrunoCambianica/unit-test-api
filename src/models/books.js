let mongoose = require("mongoose");

let Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Books",
  new Schema({
    title: {
      type: String,
      required: "Titre obligatoire"
    },
    years: Number,
    pages: Number
  })
);
