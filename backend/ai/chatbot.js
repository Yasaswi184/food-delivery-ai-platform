module.exports = (message)=>{

if(message.includes("order"))
return "Your order is being prepared.";

if(message.includes("delivery"))
return "Your delivery will arrive soon.";

return "How can I help you?";

};