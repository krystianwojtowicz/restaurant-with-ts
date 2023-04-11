import { CartItemType } from "../../../Interface";
import "./Product.scss";

interface ProductProps {
  pizza: CartItemType;
  addPizza: (pizza: CartItemType) => void;
}

export const Product = ({ pizza, addPizza }: ProductProps) => {
  return (
    <div className="product">
      <img className="img" src={pizza.img} alt="pizza" />
      <h2 className="heading">{pizza.name}</h2>
      <p className="paragraph">
        {pizza.ingredients && pizza.ingredients.join(", ")}
      </p>
      <div className="flex">
        <h2>{pizza.price} $</h2>
        <button className="button" onClick={() => addPizza(pizza)}>add to cart</button>
      </div>
    </div>
  );
};
