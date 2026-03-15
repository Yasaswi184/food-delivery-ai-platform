import React,{useContext} from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

function Cart(){

  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum,item)=>sum+item.price,0);

  const placeOrder = async () => {

    if(cart.length === 0){
      alert("Cart is empty");
      return;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if(!userId || !token){
      alert("Please login first");
      return;
    }

    const order = {

      userId: userId,

      restaurantId: cart[0].restaurantId,

      items: cart.map(item => ({
        menuId: item._id || null,
        name: item.name,
        price: item.price,
        quantity: 1
      })),

      totalPrice: total

    };

    console.log("Sending order:",order);

    try{

      const res = await API.post(
        "/orders",
        order,
        {
          headers:{
            Authorization: token
          }
        }
      );

      alert("Order placed successfully!");
      console.log(res.data);

      window.location.href="/orders";

    }catch(err){

      console.error("Order Error:",err.response?.data || err.message);
      alert("Order failed");

    }

  };

  return(

    <div>

      <h2>Your Cart</h2>

      {cart.map((item,index)=>(

        <div key={index}>

          <h3>{item.name}</h3>
          <p>₹{item.price}</p>

          <button onClick={()=>removeFromCart(index)}>
            Remove
          </button>

        </div>

      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>

  );

}

export default Cart;