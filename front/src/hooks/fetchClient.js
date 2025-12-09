import axios from "axios";
import { useState } from "react";
import { useNotification } from "../context/NotificationContext";

function useFetchClient() {
  const [client, setClient] = useState(null);
  const [clientFavourites, setClientFavourites] = useState([]);
  const [clientReviews, setClientReviews] = useState([]);
  const [clientViewings, setClientViewings] = useState([]);
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();

  const fetchClient = async (email) => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://easy-deal-admin-server.vercel.app/EasyAdmin/fetch-client-details?email=${email}`);
      if (res.data.success) {
        const data = res.data.clientDetails || [];

        setClient(data);
        setClientFavourites(data.favourites || []);
        setClientReviews(data.reviews || []);
        setClientViewings(data.viewings || []);
      }
    } catch (error) {
      console.error("Error in fetching client details:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";
      openNotification("warning", errorMessage, "Error");
    }
    setLoading(false);
  };

  return {
    client,
    clientFavourites,
    clientReviews,
    clientViewings,
    clientLoading: loading,
    fetchClient,
  };
}

export default useFetchClient;
