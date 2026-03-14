const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant
} = require("../controllers/restaurantController");

router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;