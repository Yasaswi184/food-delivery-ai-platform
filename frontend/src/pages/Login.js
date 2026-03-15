import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async(e)=>{

e.preventDefault();

try{

const res = await API.post("/auth/login",{
email,
password
});

localStorage.setItem("token",res.data.token);
localStorage.setItem("userId",res.data.user.id);

navigate("/");

}catch(err){

alert("Login failed");

}

};

return(

<div style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",

backgroundImage:"url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)",
backgroundSize:"cover",
backgroundPosition:"center"
}}>

<div style={{
background:"rgba(255,255,255,0.95)",
padding:"30px",
borderRadius:"10px",
width:"320px",
boxShadow:"0px 5px 20px rgba(0,0,0,0.3)"
}}>

<h2 style={{textAlign:"center"}}>Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
style={{
width:"100%",
padding:"10px",
marginBottom:"10px"
}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
style={{
width:"100%",
padding:"10px",
marginBottom:"10px"
}}
/>

<button
type="submit"
style={{
width:"100%",
padding:"10px",
background:"#ff4d4d",
color:"white",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}}
>
Login
</button>

</form>

<p style={{marginTop:"10px",textAlign:"center"}}>
Don't have account? <Link to="/register">Register</Link>
</p>

</div>

</div>

);

}

export default Login;