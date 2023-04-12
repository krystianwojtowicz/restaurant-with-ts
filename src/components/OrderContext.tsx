import { createContext } from "react";
import { OrderContextType } from "../Interface";

export const OrderContext = createContext<OrderContextType>({
  cartItems: [],
  setCartItems: () => {},
  order: {
    cartItems: [],
    city: "",
    customerName: "",
    date: "",
    email: "",
    numberOfFlat: "",
    numberOfStreet: "",
    phone: "",
    street: "",
  },
  setOrder: () => {},
});
