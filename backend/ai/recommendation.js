const Menu = require("../models/Menu");

const getRecommendations = async (restaurantId) => {

  const menu = await Menu.find({ restaurantId });

  // simple recommendation logic
  const recommended = menu
    .sort((a,b)=>b.price-a.price)
    .slice(0,3);

  return recommended;

};

module.exports = getRecommendations;
