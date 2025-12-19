import axios from "axios";
import { useState, useCallback } from "react";
import { useNotification } from "../context/NotificationContext";

function useFetchClient() {
  const [client, setClient] = useState(null);
  const [clientFavourites, setClientFavourites] = useState([]);
  const [clientReviews, setClientReviews] = useState([]);
  const [clientCart, setClientCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const openNotification = useNotification();

  const fetchClient = useCallback(
    async (email) => {
      if (!email) {
        console.warn("No email provided to fetchClient");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `https://easy-deal-admin-server.vercel.app/EasyAdmin/fetch-client`,
          {
            params: { email },
            timeout: 10000, // 10 second timeout
          }
        );

        if (res.data?.success && res.data?.client) {
          const data = res.data?.client[0];

          setClient(data);
          setClientFavourites(data?.favourites || []);
          setClientReviews(data?.reviews || []);
          setClientCart(data?.cart || []);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching client details:", error);

        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "An unexpected error occurred. Please try again later.";

        setError(errorMessage);
        openNotification("warning", errorMessage, "Error");

        // Reset state on error
        setClient(null);
        setClientFavourites([]);
        setClientReviews([]);
        setClientCart([]);
      } finally {
        setLoading(false);
      }
    },
    [openNotification]
  );

  const resetClient = useCallback(() => {
    setClient(null);
    setClientFavourites([]);
    setClientReviews([]);
    setClientCart([]);
    setError(null);
  }, []);

  return {
    client,
    clientFavourites,
    clientReviews,
    clientCart,
    clientLoading: loading,
    clientError: error,
    fetchClient,
    resetClient,
  };
}

export default useFetchClient;
