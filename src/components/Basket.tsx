import { useContext, useState, useEffect } from "react";
import { OrderContext } from "./OrderContext";
import { CartItemType } from "../Interface";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Input } from "./Input";

interface BasketProps {
  addPizza: (pizza: CartItemType) => void;
  removePizza: (pizza: CartItemType) => void;
}

// const options = [
//   {
//     label: "11:30",
//     value: "11:30",
//   },
//   {
//     label: "11:45",
//     value: "11:45",
//   },
// ];

interface Option {
  label: string;
  value: string;
}

function generateOptions(): Option[] {
  const now = new Date();
  const roundedTime = new Date(Math.ceil(now.getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000));
  const startTime = new Date(roundedTime.getTime() + 45 * 60 * 1000);
  const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 23, 59, 59);
  const options: Option[] = [];

  for (let time = startTime; time <= endTime; time = new Date(time.getTime() + 15 * 60 * 1000)) {
    const label = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const value = label.replace(':', '');
    options.push({ label, value });
  }

  return options;
}

export const Basket = ({ addPizza, removePizza }: BasketProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    const newOptions = generateOptions();
    setOptions(newOptions);
  }, []);
  const formik = useFormik({
    initialValues: {
      customerName: "",
      city: "",
      street: "",
      numberOfStreet: "",
      numberOfFlat: "",
      date: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
      numberOfStreet: Yup.string().required("Required"),
      numberOfFlat: Yup.number()
        .typeError("Must be a number")
        .required("Required"),
      email: Yup.string().email().required("Required"),
      phone: Yup.string()
        .matches(
          /^((\+48)|(0048)|(48))?[\s\-]?\d{3}[\s\-]?\d{3}[\s\-]?\d{3}$/,
          "Invalid phone number"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      setOrder({ ...cartItems, ...values });
      // await addDoc(props.pizzasCollectionRef, order);
      setIsSubmit(true);
      // console.warn(values);
    },
  });

  const { cartItems, setCartItems } = useContext(OrderContext);
  const { order, setOrder } = useContext(OrderContext);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const ordersCollectionRef = collection(db, "orders");

  const addOrder = async () => {
    await addDoc(ordersCollectionRef, order);
  };

  useEffect(() => {
    if (isSubmit) {
      addOrder();
      setIsSubmit(false);
      // remove last line
    }
  }, [isSubmit]);

  const removeAllPizzasOfOneKind = (product: CartItemType) => {
    const exist = cartItems?.find((x) => x.id === product.id);
    if (exist?.qty !== 0) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }
  };

  return (
    <main>
      <div>
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
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          placeholder="name"
          onChange={formik.handleChange}
          value={formik.values.customerName}
          name="customerName"
          onBlur={formik.handleBlur}
          touched={formik.touched.customerName}
          error={formik.errors.customerName}
        />
        {/* <label htmlFor="city">city</label> */}
        <Input
          type="text"
          placeholder="city"
          onChange={formik.handleChange}
          name="city"
          value={formik.values.city}
          onBlur={formik.handleBlur}
          touched={formik.touched.city}
          error={formik.errors.city}
        ></Input>
        <Input
          type="text"
          placeholder="street"
          onChange={formik.handleChange}
          name="street"
          value={formik.values.street}
          onBlur={formik.handleBlur}
          touched={formik.touched.street}
          error={formik.errors.street}
        ></Input>
        <Input
          type="text"
          placeholder="number of street"
          onChange={formik.handleChange}
          name="numberOfStreet"
          value={formik.values.numberOfStreet}
          onBlur={formik.handleBlur}
          touched={formik.touched.numberOfStreet}
          error={formik.errors.numberOfStreet}
        ></Input>
        <Input
          type="text"
          placeholder="number of flat"
          onChange={formik.handleChange}
          name="numberOfFlat"
          value={formik.values.numberOfFlat}
          onBlur={formik.handleBlur}
          touched={formik.touched.numberOfFlat}
          error={formik.errors.numberOfFlat}
        ></Input>
        <Input
          type="string"
          onChange={formik.handleChange}
          name="date"
          value={formik.values.date}
          onBlur={formik.handleBlur}
          touched={formik.touched.date}
          error={formik.errors.date}
        ></Input>
        <Select className="date" id="date" options={options} />
        <Input
          type="text"
          placeholder="e-mail"
          onChange={formik.handleChange}
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          touched={formik.touched.email}
          error={formik.errors.email}
        ></Input>
        <Input
          type="text"
          placeholder="phone"
          onChange={formik.handleChange}
          name="phone"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          touched={formik.touched.phone}
          error={formik.errors.phone}
        ></Input>

        <button type="submit">submit</button>
      </form>
    </main>
  );
};
