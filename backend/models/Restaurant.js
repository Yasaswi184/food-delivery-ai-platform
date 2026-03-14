const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  cuisine: String,

  rating: Number,

  location: String

},{timestamps:true});

module.exports = mongoose.model("Restaurant", restaurantSchema);