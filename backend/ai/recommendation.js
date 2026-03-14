module.exports = (orders)=>{

// simple recommendation logic

const suggestions = ["Garlic Bread","Cheese Dip","Coke"];

return suggestions[Math.floor(Math.random()*suggestions.length)];

};