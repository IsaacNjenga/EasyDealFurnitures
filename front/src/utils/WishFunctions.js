import { useWish } from "../context/WishContext";

export function WishFunctions() {
  const { wishItems, setWishItems } = useWish();

  const addToWish = (item) => {
    setWishItems((prevWishItems) => [...prevWishItems, { ...item }]);
  };

  const removeFromWish = (id) => {
    setWishItems((prevWishItems) =>
      prevWishItems.filter((item) => item._id !== id)
    );
  };

  const isInWish = (item) =>
    wishItems.some((wishItem) => wishItem._id === item?._id);

  return { addToWish, removeFromWish, isInWish };
}
