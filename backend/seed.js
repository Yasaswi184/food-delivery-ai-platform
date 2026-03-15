const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
const Menu = require("./models/Menu");

mongoose.connect("mongodb://127.0.0.1:27017/foodapp");

const topCities = [
"Hyderabad","Bangalore","Mumbai","Delhi","Chennai",
"Pune","Kolkata","Ahmedabad","Jaipur","Lucknow"
];

const otherCities = [
"Chandigarh","Indore","Nagpur","Surat","Vadodara",
"Visakhapatnam","Vijayawada","Coimbatore","Mysore","Goa"
];

const restaurantNames = [
"Biryani Palace","Paradise Kitchen","Royal Tandoor","Urban Spice",
"Food Junction","Spice Garden","Taste of India","Street Treats",
"Pizza Factory","Burger Garage","Masala Hub","Kitchen Express",
"Food Carnival","Urban Bites","Flavour Town","Hungry Point",
"Foodies Hub","Hot Plate","City Biryani","Grand Kitchen"
];

const restaurantImages = [
"https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
"https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
"https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
"https://images.unsplash.com/photo-1504674900247-0877df9cc836"
];

const foodItems = [

{ name:"Chicken Biryani", price:220, category:"Biryani", image:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0"},
{ name:"Mutton Biryani", price:320, category:"Biryani", image:"https://images.unsplash.com/photo-1617191519008-90c5a4d3c9b7"},
{ name:"Veg Biryani", price:180, category:"Biryani", image:"https://images.unsplash.com/photo-1625944525533-473f1c3c9b7c"},
{ name:"Butter Chicken", price:260, category:"Indian", image:"https://images.unsplash.com/photo-1604908176997-4310c2e1a7c6"},
{ name:"Paneer Butter Masala", price:200, category:"Indian", image:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"},
{ name:"Chicken Tikka", price:240, category:"Indian", image:"https://images.unsplash.com/photo-1601050690597-df0568f70950"},
{ name:"Margherita Pizza", price:200, category:"Pizza", image:"https://images.unsplash.com/photo-1604382354936-07c5d9983bd3"},
{ name:"Chicken Pizza", price:260, category:"Pizza", image:"https://images.unsplash.com/photo-1513104890138-7c749659a591"},
{ name:"Chicken Burger", price:120, category:"Burger", image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
{ name:"Veg Burger", price:100, category:"Burger", image:"https://images.unsplash.com/photo-1550547660-d9450f859349"},
{ name:"French Fries", price:90, category:"Snacks", image:"https://images.unsplash.com/photo-1541599540903-216a46ca1dc0"},
{ name:"Noodles", price:140, category:"Chinese", image:"https://images.unsplash.com/photo-1585032226651-759b368d7246"},
{ name:"Fried Rice", price:160, category:"Chinese", image:"https://images.unsplash.com/photo-1553621042-f6e147245754"},
{ name:"Masala Dosa", price:120, category:"South Indian", image:"https://images.unsplash.com/photo-1589302168068-964664d93dc0"},
{ name:"Idli Sambar", price:90, category:"South Indian", image:"https://images.unsplash.com/photo-1617196034183-421b4917c92d"},
{ name:"Chocolate Cake", price:150, category:"Dessert", image:"https://images.unsplash.com/photo-1601972599720-b9c9bba70c3e"},
{ name:"Ice Cream", price:120, category:"Dessert", image:"https://images.unsplash.com/photo-1570197788417-0e82375c9371"},
{ name:"Chicken Shawarma", price:150, category:"Arabian", image:"https://images.unsplash.com/photo-1604908176997-4310c2e1a7c6"},
{ name:"Falafel Wrap", price:130, category:"Arabian", image:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec"},
{ name:"Pasta Alfredo", price:210, category:"Italian", image:"https://images.unsplash.com/photo-1525755662778-989d0524087e"}

];

async function createRestaurants(city, count){

for(let i=0;i<count;i++){

const name = restaurantNames[Math.floor(Math.random()*restaurantNames.length)];
const image = restaurantImages[Math.floor(Math.random()*restaurantImages.length)];

const restaurant = await Restaurant.create({

name: `${city} ${name}`,
cuisine:"Multi Cuisine",
rating:(Math.random()*1 + 4).toFixed(1),
location:city,
image:image

});

for(let j=0;j<20;j++){

const food = foodItems[Math.floor(Math.random()*foodItems.length)];

await Menu.create({

restaurantId:restaurant._id,
name:food.name,
price:food.price,
category:food.category,
image:food.image

});

}

}

}

async function seed(){

await Restaurant.deleteMany();
await Menu.deleteMany();

for(const city of topCities){
await createRestaurants(city,15);
}

for(const city of otherCities){
await createRestaurants(city,5);
}

console.log("Large food dataset created successfully");

process.exit();

}

seed();
