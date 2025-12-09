import axios from "axios";
import { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";

const server_url = process.env.REACT_APP_API_MAIN_URL;

function useFetchProduct() {
  const openNotification = useNotification();
  const [productData, setProductData] = useState({});
  const [productDataLoading, setProductDataLoading] = useState(false);

  const fetchProduct = async (id) => {
    if (!id) return;
    setProductDataLoading(true);
    try {
      const res = await axios.get(`${server_url}/fetch-product?id=${id}`);
      if (res.data.success) {
        setProductData(res.data.product);
      }
    } catch (error) {
      console.error("Error in fetching Product:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";
      openNotification("warning", errorMessage, "Error");
    } finally {
      setProductDataLoading(false);
    }
  };

  return {
    productData,
    productDataLoading,
    fetchProduct,
  };
}

export default useFetchProduct;
