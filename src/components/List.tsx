import { CartItemType } from '../Interface'
// import { OrderContext } from "./OrderContext";
import { useState, useEffect, useContext } from "react";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

export const List = () => {
    // const { cartItems, setCartItems } = useContext(OrderContext);
    const [pizzas, setPizzas] = useState<CartItemType[]>([]);
    const pizzasCollectionRef = collection(db, "meals");

    useEffect(() => {
        const fetchPizzas = async () => {
          const data: QuerySnapshot = await getDocs(pizzasCollectionRef);
          const pizzasData: CartItemType[] = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          console.log(pizzasData)
          setPizzas(pizzasData);
        };
    
        fetchPizzas();
      }, []);
  
      return (
        <main>
          {pizzas.map((pizza: CartItemType) => {
            return (
              <div
                key={pizza.id}
                // pizza={pizza}
                // addPizza={props.addPizza}
              >{pizza.name}</div>
            );
          })}
        </main>
      );
    }