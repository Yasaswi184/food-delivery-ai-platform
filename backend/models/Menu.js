const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({

  restaurantId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Restaurant"
  },

  name:String,

  price:Number,

  category:String,

  image:String   // food image

},{timestamps:true});

module.exports = mongoose.model("Menu",menuSchema);
