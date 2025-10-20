import { useCart } from "../context/CartContext";

export function CartFunctions() {
  const { setCartItems, cartItems } = useCart();

  const updateCart = (item, newQuantity) => {
    if (newQuantity < 1 || !item) return;
    if (newQuantity < 1) return;

    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { ...item, quantity: 1 },
    ]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== id)
    );
  };

  const isInCart = (item) =>
    cartItems.some((cartItem) => cartItem._id === item?._id);

  return { addToCart, removeFromCart, updateCart, isInCart };
}
