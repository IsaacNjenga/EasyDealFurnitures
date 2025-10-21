import { createContext, useContext, useEffect, useState } from "react";

export const WishContext = createContext();

export function useWish() {
  return useContext(WishContext);
}

export function WishProvider({ children }) {
  const [wishItems, setWishItems] = useState(() => {
    //load from localstorage on first render
    const storedWish = localStorage.getItem("wishlist");
    return storedWish ? JSON.parse(storedWish) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishItems));
  }, [wishItems]);

  const value = { wishItems, setWishItems };

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
}
