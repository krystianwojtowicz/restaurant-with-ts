import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
  renderHook,
} from "@testing-library/react";
import { Basket } from "./Basket";
// import { OrderType } from "../../Interface";
import { useState, useEffect } from "react";
import { OrderContext } from "../OrderContext";

describe("Basket", () => {
  const addPizza = jest.fn();
  const removePizza = jest.fn();
  const onSubmit = jest.fn();

  it("should render with items in the cart", () => {
    const cartItems = [
      { id: "1", name: "Pizza Americana", price: 10, qty: 2 },
      { id: "2", name: "Pizza Margherita", price: 8, qty: 1 },
    ];
    const setCartItems = jest.fn();
    const order = {
      customerName: "",
      city: "",
      street: "",
      numberOfStreet: "",
      numberOfFlat: "",
      date: "",
      email: "",
      phone: "",
    };
    const setOrder = jest.fn();

    const { getByText } = render(
      <OrderContext.Provider
        value={{ cartItems, setCartItems, order, setOrder }}
      >
        <Basket addPizza={addPizza} removePizza={removePizza} />
      </OrderContext.Provider>
    );

    expect(getByText("Pizza Americana")).toBeInTheDocument();
    expect(getByText("Pizza Margherita")).toBeInTheDocument();
  });
  it("calls the onSubmit function", async () => {
    const { getByLabelText } = render(
      <Basket
        addPizza={addPizza}
        removePizza={removePizza}
        onSubmit={onSubmit}
      />
    );
    await act(async () => {
      fireEvent.change(getByLabelText("name"), {
        target: { value: "John Doe" },
      });
      fireEvent.change(getByLabelText("city"), {
        target: { value: "New York" },
      });
      fireEvent.change(getByLabelText("street"), {
        target: { value: "Broadway" },
      });
      fireEvent.change(getByLabelText("number of street"), {
        target: { value: "123" },
      });
      fireEvent.change(getByLabelText("number of flat"), {
        target: { value: "456" },
      });
      fireEvent.change(getByLabelText("hour of delivery"), {
        target: { value: "23:45" },
      });
      fireEvent.change(getByLabelText("e-mail"), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(getByLabelText("phone number"), {
        target: { value: "777777777" },
      });
      onSubmit({ lazy: true });
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ lazy: true });
    });
  });
  it("renders component corectly", () => {
    const { getByRole } = render(
      <Basket addPizza={addPizza} removePizza={removePizza} />
    );
    const button = screen.getByText(/submit/i);
    expect(button).toBeInTheDocument();
    const expectedText = "your cart";
    const heading = getByRole("heading", { name: expectedText });
    expect(heading).toBeInTheDocument();
    const inputElement = screen.getByRole("textbox", { name: "city" });
    expect(inputElement).toBeInTheDocument();
  });
});
