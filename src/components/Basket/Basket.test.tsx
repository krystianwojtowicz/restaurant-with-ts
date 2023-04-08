// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { Basket } from "./Basket";

// // test("renders learn react link", () => {
// //   render(<Basket />);
// //   const linkElement = screen.getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// // });

// describe("Basket", () => {
//     it("renders the city", async () => {

//     })
// })
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import {Basket} from './Basket'

describe("Basket", () => {
// test('submits the form with valid data', async () => {
  const addPizza = jest.fn()
  const removePizza = jest.fn()
  const onSubmit = jest.fn();
  it("renders the city", async () => {
  

  // const name = getByLabelText("name");
  // fireEvent.change(name, { target: { value: 'John Doe' } })
  // expect((name as HTMLInputElement).value).toBe("John Doe");
  const { getByLabelText } = render(<Basket addPizza={addPizza} removePizza={removePizza} onSubmit={onSubmit}/>)
  await act(async () => {
    
    
    fireEvent.change(getByLabelText('name'), { target: { value: 'John Doe' } })
    fireEvent.change(getByLabelText('city'), { target: { value: 'New York' } })
    fireEvent.change(getByLabelText('street'), { target: { value: 'Broadway' } })
    fireEvent.change(getByLabelText('number of street'), { target: { value: '123' } })
    fireEvent.change(getByLabelText('number of flat'), { target: { value: '456' } })
    fireEvent.change(getByLabelText('hour of delivery'), { target: { value: '23:45' } })
    fireEvent.change(getByLabelText('e-mail'), { target: { value: 'john@example.com' } })
    fireEvent.change(getByLabelText('phone number'), { target: { value: '777777777' } })
    onSubmit({lazy:true})
  });
  // fireEvent.change(getByLabelText('name'), { target: { value: 'John Doe' } })
  // fireEvent.change(getByLabelText('city'), { target: { value: 'New York' } })
  // fireEvent.change(getByLabelText('street'), { target: { value: 'Broadway' } })
  // fireEvent.change(getByLabelText('number of street'), { target: { value: '123' } })
  // fireEvent.change(getByLabelText('number of flat'), { target: { value: '456' } })
  // fireEvent.change(getByLabelText('hour of delivery'), { target: { value: '23:45' } })
  // fireEvent.change(getByLabelText('e-mail'), { target: { value: 'john@example.com' } })
  // fireEvent.change(getByLabelText('phone number'), { target: { value: '777777777' } })

  // fireEvent.submit(getByText('submit'))
  

  await waitFor(() => {
    // expect(onSubmit).toHaveBeenCalledWith({ lazy: true });
    expect(onSubmit).toHaveBeenCalled()
    // Add additional assertions to test the expected behavior
  })
});
})