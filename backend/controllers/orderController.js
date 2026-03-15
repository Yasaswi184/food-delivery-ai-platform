const Order = require("../models/Order");


// Create order
exports.createOrder = async (req,res)=>{

 try{

  const orderData = {
   ...req.body,
   userId: req.user.id   // attach logged in user
  };

  const order = await Order.create(orderData);

  res.status(201).json(order);

 }catch(err){

  res.status(500).json(err);

 }

};


// Get orders for logged in user
exports.getOrders = async (req,res)=>{

 try{

  const orders = await Order.find({
   userId:req.user.id
  }).sort({createdAt:-1});

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