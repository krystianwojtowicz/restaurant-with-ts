import { CartItemType } from "../../Interface";
import { useState, useEffect } from "react";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Product } from "./Product/Product";
import "./List.scss";

interface ListProps {
  addPizza: (pizza: CartItemType) => void;
}

export const List = (props: ListProps) => {
  const [pizzas, setPizzas] = useState<CartItemType[]>([]);
  const pizzasCollectionRef = collection(db, "meals");

  useEffect(() => {
    const fetchPizzas = async () => {
      const data: QuerySnapshot = await getDocs(pizzasCollectionRef);
      const pizzasData: any = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPizzas(pizzasData);
    };
    fetchPizzas();
  }, []);

  return (
    <main className="list">
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
