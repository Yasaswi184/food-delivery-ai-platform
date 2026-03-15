import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("token");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    if (cart.length === 0) { alert("Your cart is empty!"); return; }
    setPaying(true);
    setTimeout(async () => {
      try {
        const order = {
          items: cart.map((item) => ({ name: item.name, price: item.price, quantity: 1 })),
          totalPrice: total,
          paymentStatus: "paid",
          paymentMethod: "online",
        };
        await API.post("/orders", order, { headers: { Authorization: token } });
        setPaying(false);
        setSuccess(true);
        clearCart();
      } catch (err) {
        console.error("Order Error:", err.response?.data || err.message);
        setPaying(false);
        alert("Payment failed. Please try again.");
      }
    }, 2000);
  };

  if (success) {
    return (
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"80vh"}}>
        <div style={{textAlign:"center",padding:"40px",backgroundColor:"white",borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.1)",maxWidth:"400px"}}>
          <h1 style={{fontSize:"60px",color:"#2ecc71",margin:"0 0 20px 0"}}>✓</h1>
          <h2>Payment Successful!</h2>
          <p style={{color:"#666"}}>Your order has been placed successfully.</p>
          <p style={{fontSize:"20px",fontWeight:"bold",color:"#e74c3c",marginBottom:"20px"}}>Amount Paid: ₹{total}</p>
          <button style={{display:"block",width:"100%",padding:"12px",backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",cursor:"pointer",marginBottom:"10px"}} onClick={() => (window.location.href = "/orders")}>View Orders</button>
          <button style={{display:"block",width:"100%",padding:"12px",backgroundColor:"#333",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",cursor:"pointer"}} onClick={() => (window.location.href = "/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  if (paying) {
    return (
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"80vh"}}>
        <div style={{textAlign:"center",padding:"40px",backgroundColor:"white",borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.1)",maxWidth:"400px"}}>
          <h2>Processing Payment...</h2>
          <p style={{color:"#666"}}>Please do not close this window.</p>
          <p style={{fontSize:"20px",fontWeight:"bold",color:"#e74c3c"}}>Amount: ₹{total}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{maxWidth:"600px",margin:"0 auto",padding:"20px"}}>
      <h2 style={{fontSize:"24px",fontWeight:"bold",marginBottom:"20px"}}>Your Cart</h2>
      {cart.length === 0 ? (
        <div style={{textAlign:"center",padding:"40px"}}>
          <p>Your cart is empty</p>
          <button style={{padding:"12px 24px",backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"8px",cursor:"pointer"}} onClick={() => (window.location.href = "/")}>Browse Restaurants</button>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px",border:"1px solid #eee",borderRadius:"8px",marginBottom:"10px",backgroundColor:"#fff"}}>
              <div>
                <h3 style={{margin:"0 0 5px 0"}}>{item.name}</h3>
                <p style={{margin:0,color:"#e74c3c",fontWeight:"bold"}}>₹{item.price}</p>
              </div>
              <button style={{backgroundColor:"#e74c3c",color:"white",border:"none",padding:"8px 12px",borderRadius:"5px",cursor:"pointer"}} onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <div style={{backgroundColor:"#f9f9f9",padding:"20px",borderRadius:"8px",marginBottom:"20px"}}>
            <h3 style={{marginBottom:"15px"}}>Payment Summary</h3>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px",color:"#555"}}><span>Subtotal</span><span>₹{total}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px",color:"#555"}}><span>Delivery Fee</span><span>₹40</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px",color:"#555"}}><span>Taxes</span><span>₹{Math.round(total * 0.05)}</span></div>
            <hr/>
            <div style={{display:"flex",justifyContent:"space-between",fontWeight:"bold",fontSize:"18px",marginTop:"10px"}}><span>Total Amount</span><span>₹{total + 40 + Math.round(total * 0.05)}</span></div>
          </div>
          <button style={{width:"100%",padding:"15px",backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"8px",fontSize:"18px",fontWeight:"bold",cursor:"pointer"}} onClick={handlePayment}>Pay ₹{total + 40 + Math.round(total * 0.05)}</button>
        </>
      )}
    </div>
  );
}

export default Cart;