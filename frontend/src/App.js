import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { CartProvider } from "./context/CartContext";

function PrivateRoute({children}){

const token = localStorage.getItem("token");

return token ? children : <Navigate to="/login"/>;

}

function App(){

return(

<CartProvider>

<Router>

<Navbar/>

<Routes>

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route path="/" element={
<PrivateRoute>
<Home/>
</PrivateRoute>
}/>

<Route path="/menu/:restaurantId" element={
<PrivateRoute>
<Menu/>
</PrivateRoute>
}/>

<Route path="/cart" element={
<PrivateRoute>
<Cart/>
</PrivateRoute>
}/>

<Route path="/orders" element={
<PrivateRoute>
<Orders/>
</PrivateRoute>
}/>

</Routes>

</Router>

</CartProvider>

);

}

export default App;