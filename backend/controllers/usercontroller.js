const User = require("../models/User");

// Get logged-in user profile
exports.getProfile = async (req,res)=>{

 try{

  const user = await User.findById(req.user.id).select("-password");

  res.json(user);

 }catch(err){

  res.status(500).json(err);

 }

};

// Update profile
exports.updateProfile = async (req,res)=>{

 try{

  const user = await User.findByIdAndUpdate(
   req.user.id,
   req.body,
   {new:true}
  ).select("-password");

  res.json(user);

 }catch(err){

  res.status(500).json(err);

 }

};