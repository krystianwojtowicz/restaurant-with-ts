import { createContext } from "react";
import { OrderContextType } from '../Interface'

  export const OrderContext = createContext<OrderContextType>({
    cartItems: [],
    setCartItems: () => {},
    order: {},
    setOrder: () => {},
  });