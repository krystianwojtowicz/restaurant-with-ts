export interface CartItemType {
  id: string;
  name: string;
  price: number;
  ingredients?: string[];
  qty: number;
  img?: string;
}

export interface OrderType {
  cartItems?: CartItemType[];
  city: string;
  customerName: string;
  date: string;
  email: string;
  numberOfFlat: string;
  numberOfStreet: string;
  phone: string;
  street: string;
}

export interface OrderContextType {
  cartItems: CartItemType[];
  setCartItems: (items: CartItemType[]) => void;
  order?: OrderType;
  setOrder: (order: OrderType) => void;
}
