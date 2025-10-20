import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}
export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => setCartOpen(!cartOpen);

  const value = { cartOpen, toggleCart, setCartItems, cartItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
