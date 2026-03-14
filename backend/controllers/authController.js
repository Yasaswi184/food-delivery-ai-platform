const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{

try{

const {name,email,password} = req.body;

const hashedPassword = await bcrypt.hash(password,10);

const user = await User.create({
name,
email,
password:hashedPassword
});

res.json(user);

}catch(err){

res.status(500).json(err);

}

};

exports.login = async(req,res)=>{

try{

const {email,password}=req.body;

const user = await User.findOne({email});

if(!user) return res.status(400).json("User not found");

const match = await bcrypt.compare(password,user.password);

if(!match) return res.status(400).json("Wrong password");

const token = jwt.sign({id:user._id},"secret");

res.json({user,token});

}catch(err){

res.status(500).json(err);

}

};