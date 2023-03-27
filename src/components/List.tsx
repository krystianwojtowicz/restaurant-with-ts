import { CartItemType } from "../Interface";
import { useState, useEffect} from "react";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { Product } from './Product'

interface ListProps {
  addPizza: (pizza: CartItemType) => void;
}

export const List = (props: ListProps) => {
  // const { cartItems, setCartItems } = useContext(OrderContext);
  const [pizzas, setPizzas] = useState<CartItemType[]>([]);
  const pizzasCollectionRef = collection(db, "meals");

  useEffect(() => {
    const fetchPizzas = async () => {
      const data: QuerySnapshot = await getDocs(pizzasCollectionRef);
      const pizzasData: CartItemType[] = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(pizzasData);
      setPizzas(pizzasData);
    };

    fetchPizzas();
  }, []);

  return (
    <main>
      {pizzas.map((pizza) => {
        return (
          <Product
            key={pizza.id}
            pizza={pizza}
            addPizza={props.addPizza}
          ></Product>
        );
      })}
    </main>
  );
};
