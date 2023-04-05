import { useContext } from "react";
import { OrderContext } from "../OrderContext";
import './Confirmation.scss';

export const Confirmation = () => {
  const { order } = useContext(OrderContext);
  return (
    <main className="confirmation">
      <h1 className="confirmation-heading">Confirmation</h1>
      {order?.customerName ? (
        <div>
          <h3 className="confirmation-heading">customer's name: {order.customerName}</h3>
          <h3 className="confirmation-heading">street: {order.street}</h3>
          <h3 className="confirmation-heading">city: {order.city}</h3>
          <h3 className="confirmation-heading">number of street: {order.numberOfStreet}</h3>
          {order.numberOfFlat ? (
            <h2 className="confirmation-heading">number of flat: {order.numberOfFlat}</h2>
          ) : null}
          <h3 className="confirmation-heading">hour of delivery: {order.date}</h3>
          <h3 className="confirmation-heading">e-mail: {order.email}</h3>
          <h3 className="confirmation-heading">phone: {order.phone}</h3>
        </div>
      ) : (
        <h3 className="confirmation-heading">fill out the form first</h3>
      )}
    </main>
  );
};
