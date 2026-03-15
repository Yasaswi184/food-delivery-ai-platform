import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(){

const navigate = useNavigate();

const token = localStorage.getItem("token");

const handleLogout = () => {

localStorage.removeItem("token");

navigate("/login");

};

return(

<div style={{background:"#222",color:"white",padding:"10px"}}>

<h2>Food Delivery App</h2>

{token ? (

<>

<Link to="/" style={{color:"white",marginRight:"20px"}}>Home</Link>

<Link to="/cart" style={{color:"white",marginRight:"20px"}}>Cart</Link>

<Link to="/orders" style={{color:"white",marginRight:"20px"}}>Orders</Link>

<button
onClick={handleLogout}
style={{
background:"red",
color:"white",
border:"none",
padding:"5px 10px",
cursor:"pointer"
}}
>
Logout
</button>

</>

) : (

<>

<Link to="/login" style={{color:"white",marginRight:"20px"}}>Login</Link>

<Link to="/register" style={{color:"white"}}>Register</Link>

</>

)}

</div>

);

}

export default Navbar;