import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { OrderContext } from "./components/OrderContext";
// import {
//   Link,
//   HashRouter as BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
import { Basket } from "./components/Basket";
import { List } from "./components/List";
import { Confirmation } from "./components/Confirmation";
import "./App.scss";
import { CartItemType } from './Interface'

export const App = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(
    JSON.parse(localStorage.getItem("cartItems")!) || []
  );
  const [order, setOrder] = useState({});
  return (
    <OrderContext.Provider value={{ cartItems, setCartItems, order, setOrder }}>
    <div className="App">
      <BrowserRouter>
        <nav>
          <span>PIZZA HUNT</span>
          <Link to="/basket">Basket</Link>
          <Link to="/confirmation">Confirmation</Link>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/confirmation" element={<Confirmation />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </OrderContext.Provider>
  );
}

export default App;
