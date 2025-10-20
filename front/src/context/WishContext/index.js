import { createContext, useContext, useState } from "react";

export const WishContext = createContext();

export function useWish() {
  return useContext(WishContext);
}

export function WishProvider({ children }) {
  const [wishItems, setWishItems] = useState([]);

  const value = { wishItems, setWishItems };

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
}
