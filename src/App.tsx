import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { OrderContext } from "./components/OrderContext";
import { Basket } from "./components/Basket";
import { List } from "./components/List";
import { Confirmation } from "./components/Confirmation";
import "./App.scss";
import { CartItemType } from "./Interface";

export const App = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(
    JSON.parse(localStorage.getItem("cartItems")!) || []
  );
  const [order, setOrder] = useState({});

  const addPizza = (product: CartItemType) => {
    const exist = cartItems.find((x) => x.id === product.id);
    let pizzaWithoutSomeData = { ...product };
    delete pizzaWithoutSomeData.ingredients;
    delete pizzaWithoutSomeData.img;
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === pizzaWithoutSomeData.id
            ? { ...exist, qty: (exist.qty || 0) + 1 }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...pizzaWithoutSomeData, qty: 1 }]);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
  };

  const removePizza = (product: CartItemType) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      if (exist.qty === 1) {
        setCartItems(cartItems.filter((x) => x.id !== product.id));
      } else {
        setCartItems(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: (exist.qty || 0) + 1 } : x
          )
        );
      }
    }
  };

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
            <Route path="/" element={<List addPizza={addPizza} />}></Route>
            <Route
              path="/basket"
              element={<Basket removePizza={removePizza} addPizza={addPizza} />}
            ></Route>
            <Route path="/confirmation" element={<Confirmation />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </OrderContext.Provider>
  );
};

export default App;
