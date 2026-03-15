const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
 createOrder,
 getOrders,
 updateOrderStatus
} = require("../controllers/orderController");


// create order (login required)
router.post("/", auth, createOrder);


// get orders (login required)
router.get("/", auth, getOrders);


// update order status (admin/restaurant later)
router.put("/:id", auth, updateOrderStatus);

module.exports = router;