import React,{useEffect,useState} from "react";
import API from "../services/api";
import RestaurantCard from "../components/RestaurantCard";

function Home(){

  const [restaurants,setRestaurants] = useState([]);
  const [cities,setCities] = useState([]);
  const [city,setCity] = useState("");

  useEffect(()=>{

    API.get("/restaurants")
      .then(res=>{
        setRestaurants(res.data);
      });

    API.get("/restaurants/cities")
      .then(res=>{
        setCities(res.data);
      });

  },[]);

  const filteredRestaurants = city
    ? restaurants.filter(r => r.location === city)
    : restaurants;

  return(

    <div>

      <h1>Restaurants</h1>

      <select
        value={city}
        onChange={(e)=>setCity(e.target.value)}
      >

        <option value="">Select City</option>

        {cities.map(c=>(
          <option key={c}>{c}</option>
        ))}

      </select>

      <div style={{display:"flex",flexWrap:"wrap"}}>

        {filteredRestaurants.map(r=>(
          <RestaurantCard key={r._id} restaurant={r}/>
        ))}

      </div>

    </div>

  );

}

export default Home;
