import { useState } from "react";
import { useLocation as useReactRouterLocation } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import axios from "axios";
import { useUser } from "../context/UserContext";

const key = process.env.REACT_APP_OPENCAGE_API_KEY;

function GetLocation() {
  const reactRouterLocation = useReactRouterLocation();
  const openNotification = useNotification();
  const { userLocation, setUserLocation } = useUser();
  const [selectedLocation, setSelectedLocation] = useState({
    lat: userLocation.lat || null,
    lng: userLocation.lng || null,
  });
  const [loading, setLoading] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    formattedAddress: "",
    city: "",
  });

  const reverseGeocode = async (lat, lng) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${lng}&key=${key}`,
        { withCredentials: false }
      );
      const result = res.data.results[0];

      if (result) {
        const formattedAddress = result.formatted;
        const city =
          result.components.city ||
          result.components.town ||
          result.components.village ||
          result.components.state ||
          "";

        setAddressDetails({
          formattedAddress,
          city,
        });

        openNotification(
          "success",
          `Detected location: ${formattedAddress}`,
          "Location Found!"
        );
      } else {
        openNotification(
          "warning",
          "Unable to retrieve address details. Please enter your address manually.",
          "Notice"
        );
      }
    } catch (error) {
      openNotification(
        "error",
        "Failed to get address details. Please try again or put in your address manually.",
        "Error!"
      );
      console.error("Reverse geocoding failed:", error);
    }
    setLoading(false);
  };

  const useMyLocation = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(reactRouterLocation.search);
    const city = params.get("city");

    if (city) {
      console.log(city);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setSelectedLocation({ lat, lng });
          setUserLocation({ lat, lng });
          reverseGeocode(lat, lng);
        },
        (error) => {
          openNotification(
            "error",
            "Unable to access your location.",
            "Error!"
          );
          console.error("Geolocation error:", error);
        }
      );
    } else {
      openNotification(
        "warning",
        "Geolocation is disabed. Please enable it.",
        "There was an error!"
      );
      console.log("Geolocation not supported by this browser");
    }
  };

  const useMyLocationRoute = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(reactRouterLocation.search);
    const city = params.get("city");

    if (city) {
      console.log(city);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setSelectedLocation({ lat, lng });
          setUserLocation({ lat, lng });
        },
        (error) => {
          openNotification(
            "error",
            "Unable to access your location.",
            "Error!"
          );
          console.error("Geolocation error:", error);
        }
      );
    } else {
      openNotification(
        "warning",
        "Geolocation is disabed. Please enable it.",
        "There was an error!"
      );
      console.log("Geolocation not supported by this browser");
    }
  };

  return {
    selectedLocation,
    useMyLocation,
    useMyLocationRoute,
    addressDetails,
    geoLoading: loading,
  };
}

export default GetLocation;

//{lat: -1.2142139, lng: 36.8661946}
