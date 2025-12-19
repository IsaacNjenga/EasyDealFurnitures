import { createContext, useContext, useEffect, useState } from "react";
import useFetchClient from "../../hooks/fetchClient";
import useFetchAllProducts from "../../hooks/fetchAllProducts";
import { useAuth } from "../AuthContext";

export const WishContext = createContext();

export function useWish() {
  return useContext(WishContext);
}

export function WishProvider({ children }) {
  const { client, fetchClient } = useFetchClient();
  const { currentUser } = useAuth();
  const { products } = useFetchAllProducts();
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    if (currentUser?.email) {
      fetchClient(currentUser?.email);
    }
    //eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    if (client) {
      setWishList(client.favourites || []);
    }
  }, [client]);

  const liveWishItems = wishList
    .map((item) => {
      const product = products?.find((p) => p._id === item._id);
      return product ? { ...product } : null;
    })
    .filter(Boolean);

  const value = { wishList, setWishList, liveWishItems };

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
}
