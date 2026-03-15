import React, { useEffect, useState } from "react";
import API from "../services/api";

function Orders(){

  const [orders,setOrders] = useState([]);

  useEffect(()=>{

    const fetchOrders = async () => {

      const token = localStorage.getItem("token");

      try{

        const res = await API.get("/orders",{
          headers:{
            Authorization: token
          }
        });

        setOrders(res.data);

      }catch(err){

        console.error("Error fetching orders:",err.response?.data || err.message);

      }

    };

    fetchOrders();

  },[]);

  return(

    <div>

      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (

        <div
          key={order._id}
          style={{
            border:"1px solid gray",
            margin:"10px",
            padding:"10px"
          }}
        >

          <h3>Order ID: {order._id}</h3>

          <p>Status: {order.status}</p>

          <p>Total: ₹{order.totalPrice}</p>

          <h4>Items</h4>

          {order.items.map((item,index)=>(
            <div key={index}>
              {item.name} - ₹{item.price}
            </div>
          ))}

        </div>

      ))}

    </div>

  );

}

export default Orders;