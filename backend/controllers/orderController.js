const Order = require("../models/Order");

// Create order
exports.createOrder = async (req,res)=>{

 try{

  const order = await Order.create(req.body);

  res.status(201).json(order);

 }catch(err){

  res.status(500).json(err);

 }

};

// Get all orders
exports.getOrders = async (req,res)=>{

 try{

  const orders = await Order.find();

  res.json(orders);

 }catch(err){

  res.status(500).json(err);

 }

};

// Update order status
exports.updateOrderStatus = async (req,res)=>{

 try{

  const order = await Order.findByIdAndUpdate(
   req.params.id,
   {status:req.body.status},
   {new:true}
  );

  res.json(order);

 }catch(err){

  res.status(500).json(err);

 }

};