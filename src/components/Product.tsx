import { CartItemType } from "../Interface";

interface ProductProps {
  pizza: CartItemType;
  addPizza: (pizza: CartItemType) => void;
}

export const Product = ({pizza, addPizza}: ProductProps) => {

  return (
    <div>
      <h1>name: {pizza.name}</h1>
      <h1>ingredients: {pizza.ingredients && pizza.ingredients.join(",")}</h1>
      <h1>price: {pizza.price}</h1>
      <img src={pizza.img} alt="" />
      <button onClick={() => addPizza(pizza)}>add to cart</button>
    </div>
  );
}