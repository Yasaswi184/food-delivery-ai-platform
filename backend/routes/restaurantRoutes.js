const express = require("express");
const router = express.Router();

const {
  getRestaurants,
  getCities
} = require("../controllers/restaurantController");

router.get("/", getRestaurants);

router.get("/cities", getCities);

module.exports = router;
