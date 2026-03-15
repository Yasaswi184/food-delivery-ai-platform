import React,{useEffect,useState,useContext} from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

function Menu(){

  const {restaurantId} = useParams();

  const [menu,setMenu] = useState([]);
  const [recommendations,setRecommendations] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(()=>{

    // fetch menu
    API.get(`/menu/${restaurantId}`)
      .then(res=>{
        setMenu(res.data);
      })
      .catch(err=>console.log(err));

    // fetch recommendations
    API.get(`/recommendations/${restaurantId}`)
      .then(res=>{
        setRecommendations(res.data);
      })
      .catch(err=>console.log(err));

  },[restaurantId]);

  const handleAddToCart = (item) => {

    const cartItem = {
      ...item,
      restaurantId: restaurantId
    };

    addToCart(cartItem);

  };

  return(

    <div>

      <h2>Menu</h2>

{menu.map(item=>(
  <div key={item._id} style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>

    <img
      src={item.image}
      alt={item.name}
      style={{width:"200px",height:"120px",objectFit:"cover"}}
    />

    <h3>{item.name}</h3>
    <p>{item.category}</p>
    <p>₹{item.price}</p>

    <button onClick={()=>handleAddToCart(item)}>
      Add to Cart
    </button>

  </div>
))}


      <h2>Recommended for you</h2>

      {recommendations.map(item=>(
        <div key={item._id} style={{border:"1px solid green",margin:"10px",padding:"10px"}}>

          <h3>{item.name}</h3>
          <p>₹{item.price}</p>

        </div>
      ))}

    </div>

  );

}

export default Menu;
