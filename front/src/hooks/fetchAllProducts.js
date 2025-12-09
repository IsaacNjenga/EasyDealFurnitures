import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";


function useFetchAllProducts() {
  const openNotification = useNotification();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const fetchProducts = useCallback(async (pageNum = 1, refresh = false) => {
    if (pageNum === 1 || refresh) {
      setProductsLoading(true);
    }

    try {
      if (refresh) setRefreshing(true);

      const res = await axios.get(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/fetch-all-products?page=${pageNum}&limit=12`
      );

      if (res.data.success) {
        const newProducts = res.data.products;

        if (refresh || pageNum === 1) {
          setProducts(newProducts);
        } else {
          // Simple append for pagination - dedupe by _id
          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p._id));
            const uniqueNew = newProducts.filter(
              (p) => !existingIds.has(p._id)
            );
            return [...prev, ...uniqueNew];
          });
        }

        setHasMore(pageNum < res.data.totalPages);
        setPage(pageNum);
        setErrorMessage(null);
      } else {
        const errorMsg =
          res.data.message || "Failed to fetch products. Try again";
        setErrorMessage(errorMsg);
        openNotification("error", errorMsg, "Something went wrong...");
      }
    } catch (error) {
      console.error("Error fetching Products:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      openNotification("warning", errorMessage, "Error");
    } finally {
      setRefreshing(false);
      setProductsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handleLoadMore = useCallback(async () => {
    if (hasMore && !productsLoading && !refreshing) {
      await fetchProducts(page + 1);
    }
  }, [hasMore, productsLoading, refreshing, page, fetchProducts]);

  const productsRefresh = useCallback(() => {
    fetchProducts(1, true);
  }, [fetchProducts]);

  return {
    products,
    productsLoading,
    errorMessage,
    productsRefresh,
    handleLoadMore,
  };
}

export default useFetchAllProducts;
