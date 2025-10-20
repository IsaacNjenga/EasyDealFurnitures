import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems } = useCart();

  return (
    <div>
      <pre>{JSON.stringify(cartItems, null, 2)}</pre>
    </div>
  );
}

export default Cart;
