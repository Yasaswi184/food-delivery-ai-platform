import React from "react";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant }) {

  const navigate = useNavigate();

  return (

    <div
      style={{
        border:"1px solid #ddd",
        borderRadius:"10px",
        width:"250px",
        margin:"10px",
        padding:"10px",
        cursor:"pointer"
      }}
      onClick={()=>navigate(`/menu/${restaurant._id}`)}
    >

      <img
        src={restaurant.image}
        alt={restaurant.name}
        style={{width:"100%",height:"150px",objectFit:"cover",borderRadius:"8px"}}
      />

      <h3>{restaurant.name}</h3>
      <p>{restaurant.cuisine}</p>
      <p>⭐ {restaurant.rating}</p>
      <p>{restaurant.location}</p>

    </div>

  );

}

export default RestaurantCard;
