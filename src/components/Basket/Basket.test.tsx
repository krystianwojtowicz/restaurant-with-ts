import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { Basket } from "./Basket";

describe("Basket", () => {
  const addPizza = jest.fn();
  const removePizza = jest.fn();
  const onSubmit = jest.fn();
  it("calls the onSubmit funciton", async () => {
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
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
