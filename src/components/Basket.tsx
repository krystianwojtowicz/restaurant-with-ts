import { useContext } from "react";
import { OrderContext } from "./OrderContext";
import { CartItemType } from '../Interface'

interface BasketProps {
    addPizza: (pizza: CartItemType) => void;
    removePizza: (pizza: CartItemType) => void;
  }

export const Basket = ({addPizza, removePizza}: BasketProps) => {
    const { cartItems, setCartItems } = useContext(OrderContext);

    const removeAllPizzasOfOneKind = (product: CartItemType) => {
            const exist = cartItems?.find((x) => x.id === product.id);
            if (exist?.qty !== 0) {
              setCartItems(cartItems.filter((x) => x.id !== product.id));
            }
      };

    return (
        <main>
            <h1>your cart</h1>
            {cartItems?.length === 0 && <h1>Cart is Empty</h1>}
            {cartItems?.map((item) => (
          <div key={item.id}>
            <div>
              <h4>{item.name}</h4>
              <h5>${item.price}</h5>
            </div>
            <div>
              <i
                className="fas fa-trash"
                onClick={() => removeAllPizzasOfOneKind(item)}
              ></i>
              <i
                className="fas fa-chevron-up"
                onClick={() => addPizza(item)}
              ></i>
              <p>
                {item.qty} x ${item.price?.toFixed(2)}
              </p>
              <i
                onClick={() => removePizza(item)}
                className="fas fa-chevron-down"
              ></i>
            </div>
          </div>
        ))}
        </main>
    )
}