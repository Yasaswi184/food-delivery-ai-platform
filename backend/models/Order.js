const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },

  items: [
    {
      menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
      },
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalPrice: Number,

  status: {
    type: String,
    enum: ["pending","accepted","preparing","out-for-delivery","delivered"],
    default: "pending"
  }

},{timestamps:true});

module.exports = mongoose.model("Order",orderSchema);