const Menu = require("../models/Menu");

// Create menu item
exports.createMenu = async (req, res) => {
  try {

    const menu = await Menu.create(req.body);

    res.status(201).json(menu);

  } catch (err) {
    res.status(500).json(err);
  }
};

// Get menu by restaurant
exports.getMenuByRestaurant = async (req, res) => {
  try {

    const menu = await Menu.find({
      restaurantId: req.params.restaurantId
    });

    res.json(menu);

  } catch (err) {
    res.status(500).json(err);
  }
};