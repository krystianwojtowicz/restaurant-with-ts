import { useContext, useState, useEffect } from "react";
import { OrderContext } from "../OrderContext";
import { CartItemType } from "../../Interface";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Input } from "../Input/Input";
import "./Basket.scss";

interface BasketProps {
  addPizza: (pizza: CartItemType) => void;
  removePizza: (pizza: CartItemType) => void;
}

interface Option {
  label: string;
  value: string;
}

function generateOptions(): Option[] {
  const now = new Date();
  const roundedTime = new Date(
    Math.ceil(now.getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
  );
  const startTime = new Date(roundedTime.getTime() + 45 * 60 * 1000);
  const endTime = new Date(
    startTime.getFullYear(),
    startTime.getMonth(),
    startTime.getDate(),
    23,
    59,
    59
  );
  const options: Option[] = [];

  for (
    let time = startTime;
    time <= endTime;
    time = new Date(time.getTime() + 15 * 60 * 1000)
  ) {
    const label = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const value = label;
    options.push({ label, value });
  }

  return options;
}

export const Basket = ({ addPizza, removePizza }: BasketProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const { cartItems, setCartItems } = useContext(OrderContext);
  const { order, setOrder } = useContext(OrderContext);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const ordersCollectionRef = collection(db, "orders");
  const addOrder = async () => {
    await addDoc(ordersCollectionRef, order);
  };
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
      customerName: Yup.string().required("required"),
      city: Yup.string().required("required"),
      street: Yup.string().required("required"),
      numberOfStreet: Yup.string().required("required"),
      numberOfFlat: Yup.number().typeError("Must be a number"),
      email: Yup.string().email().required("required"),
      phone: Yup.string()
        .matches(
          /^((\+48)|(0048)|(48))?[\s\-]?\d{3}[\s\-]?\d{3}[\s\-]?\d{3}$/,
          "invalid phone number"
        )
        .required("iequired"),
    }),
    onSubmit: (values) => {
      setOrder({ ...cartItems, ...values });
      setIsSubmit(true);
    },
  });

  useEffect(() => {
    if (isSubmit) {
      addOrder();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  const removeAllPizzasOfOneKind = (product: CartItemType) => {
    const exist = cartItems?.find((x) => x.id === product.id);
    if (exist?.qty !== 0) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }
  };

  let totalPrice: number = cartItems.reduce((total, item) => {
    return total + Number(item.price) * item.qty;
  }, 0);

  return (
    <main className="basket">
      <div>
        <h1 className="heading">your cart</h1>
        {cartItems?.length === 0 && <h1 className="heading">Cart is Empty</h1>}
        {cartItems?.map((item) => (
          <div className="item" key={item.id}>
            <div>
              <h4>{item.name}</h4>
              <h5 className="price">${item.price}</h5>
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
                {item.qty} x {item.price} $
              </p>
              <i
                onClick={() => removePizza(item)}
                className="fas fa-chevron-down"
              ></i>
            </div>
          </div>
        ))}
        <p className="basket-paragraph">Your Total: {totalPrice} $</p>
      </div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Input
          label="name"
          type="text"
          placeholder="name"
          onChange={formik.handleChange}
          value={formik.values.customerName}
          name="customerName"
          onBlur={formik.handleBlur}
          touched={formik.touched.customerName}
          error={formik.errors.customerName}
        />
        <Input
          label="city"
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
          label="street"
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
          label="number of street"
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
          label="namber of flat"
          type="text"
          placeholder="number of flat"
          onChange={formik.handleChange}
          name="numberOfFlat"
          value={formik.values.numberOfFlat}
          onBlur={formik.handleBlur}
          touched={formik.touched.numberOfFlat}
          error={formik.errors.numberOfFlat}
        ></Input>
        <label className="label-date" htmlFor="date">hour of delivery</label>
        <Select
          className="date"
          name="date"
          value={options.find((option) => option.value === formik.values.date)}
          onChange={(option) => formik.setFieldValue("date", option?.value)}
          onBlur={formik.handleBlur}
          options={options}
        />
        <Input
          label="e-mail"
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
          label="phone number"
          type="text"
          placeholder="phone"
          onChange={formik.handleChange}
          name="phone"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          touched={formik.touched.phone}
          error={formik.errors.phone}
        ></Input>

        <button className="button" type="submit">submit</button>
      </form>
    </main>
  );
};
