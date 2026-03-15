const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const menuRoutes = require("./routes/menuRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/restaurants",restaurantRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/menu",menuRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/users",userRoutes);

app.get("/",(req,res)=>{
res.send("Food Delivery API Running");
});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});