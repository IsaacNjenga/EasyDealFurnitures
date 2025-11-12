import { createContext, useContext, useEffect, useState } from "react";
import { shopProducts } from "../../assets/data/data";

export const WishContext = createContext();

export function useWish() {
  return useContext(WishContext);
}

export function WishProvider({ children }) {
  const [wishItems, setWishItems] = useState(() => {
    const storedWish = localStorage.getItem("wishlist");
    return storedWish ? JSON.parse(storedWish) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishItems));
  }, [wishItems]);

  // compute merged items
  const liveWishItems = wishItems
    .map((item) => {
      const product = shopProducts.find((p) => p._id === item._id);
      return product ? { ...product } : null;
    })
    .filter(Boolean); //remove non existent items

  const value = { wishItems, setWishItems, liveWishItems };

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
}
