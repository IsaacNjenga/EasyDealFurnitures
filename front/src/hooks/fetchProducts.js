import { useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

function useFetchProducts() {
  const openNotification = useNotification();
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsLoading, setAllProductsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchProducts = async () => {
    setAllProductsLoading(true);
    try {
      const res = await axios.get(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/fetch-products`
      );

      if (res.data.success) {
        setAllProducts(res.data.products);
        setErrorMessage(null);
      } else {
        setErrorMessage(res.data.message || "Failed to fetch Products.");
      }
    } catch (error) {
      console.error("Error fetching Products:", error);
      setErrorMessage("An error occurred when fetching products. Please try again later.");
      openNotification("warning", errorMessage, "Error");
    } finally {
      setAllProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, [refreshKey]);

  return {
    allProducts,
    allProductsLoading,
    errorMessage,
    allProductsRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchProducts;
