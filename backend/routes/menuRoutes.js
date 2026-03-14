const express = require("express");
const router = express.Router();

const {
  createMenu,
  getMenuByRestaurant
} = require("../controllers/menuController");

router.post("/", createMenu);
router.get("/:restaurantId", getMenuByRestaurant);

module.exports = router;