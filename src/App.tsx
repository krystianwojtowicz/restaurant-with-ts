import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { OrderContext } from "./components/OrderContext";
import { Basket } from "./components/Basket/Basket";
import { List } from "./components/List/List";
import { Confirmation } from "./components/Confirmation/Confirmation";
import "./App.scss";
import { CartItemType, OrderType } from "./Interface";
import { Navbar } from "./components/Navbar/Navbar";

const initialValues: CartItemType = {
  id: "",
  name: "",
  price: 0,
  ingredients: [""],
  qty: 0,
  img: "",
};

const initialValuesOrder: OrderType = {
  cartItems: [],
  city: "",
  customerName: "",
  date: "",
  email: "",
  numberOfFlat: "",
  numberOfStreet: "",
  phone: "",
  street: "",
};

export const App = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(
    JSON.parse(localStorage.getItem("cartItems")!) || []
  );
  const [order, setOrder] = useState<OrderType>(initialValuesOrder);

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
      console.log(cartItems);
    } else {
      setCartItems([...cartItems, { ...pizzaWithoutSomeData, qty: 1 }]);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
          <Navbar />
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
