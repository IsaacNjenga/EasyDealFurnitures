import { createContext, useContext, useEffect, useState } from "react";
import { shopProducts } from "../../assets/data/data";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}
export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    //load from localstorage on first render
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const toggleCart = () => setCartOpen(!cartOpen);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // compute merged items
  const liveCartItems = cartItems
    .map((item) => {
      const product = shopProducts.find((p) => p._id === item._id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean); //remove non existent items

  const value = {
    cartOpen,
    toggleCart,
    setCartItems,
    cartItems,
    liveCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
