const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({

  name: String,

  cuisine: String,

  rating: Number,

  location: String,

  image: String   // restaurant photo

},{timestamps:true});

module.exports = mongoose.model("Restaurant",restaurantSchema);
