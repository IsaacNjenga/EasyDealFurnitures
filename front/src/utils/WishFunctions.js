import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useWish } from "../context/WishContext";

export function WishFunctions() {
  const { userLoggedIn, setOpenAuthModal, currentUser } = useAuth();
  const { wishList, setWishList } = useWish();
  const openNotification = useNotification();

  const addToWish = async (item) => {
    if (!userLoggedIn) {
      return setOpenAuthModal(true);
    }
    setWishList((prevItems) => [...prevItems, { ...item }]);
    try {
      await axios.post(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/analytics/like/${item._id}`,
        null,
        { params: { email: currentUser?.email } }
      );
      openNotification("success", "Added to wishlist", "Nice!");
    } catch (err) {
      openNotification("error", "Failed to add to wishlist", "Error");
    }
  };

  const removeFromWish = async (id) => {
    if (!userLoggedIn) {
      return setOpenAuthModal(true);
    }

    setWishList((prevItems) => prevItems.filter((item) => item._id !== id));

    try {
      await axios.post(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/analytics/unlike/${id}`,
        null,
        { params: { email: currentUser?.email } }
      );
    } catch (err) {
      // rollback
      openNotification("error", "Failed to remove item", "Error");
    }
  };

  const isInWish = (item) =>
    wishList?.some((wishItem) => wishItem._id === item?._id);

  return { addToWish, removeFromWish, isInWish };
}
