import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsDrawer, setDetailsDrawer] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const [userLocation, setUserLocation] = useState(() => {
    //load from localstorage on first render
    const storedLocation = localStorage.getItem("userLocation");
    return storedLocation
      ? JSON.parse(storedLocation)
      : { lat: null, lng: null };
  });

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleDetailsDrawer = () => setDetailsDrawer(!detailsDrawer);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    localStorage.setItem("userLocation", JSON.stringify(userLocation));
  }, [userLocation]);

  const getGuestId = () => {
    let guestId = localStorage.getItem("guestId");

    if (!guestId) {
      guestId = `guest_${crypto.randomUUID()}`;
      localStorage.setItem("guestId", guestId);
    }

    return guestId;
  };

  useEffect(() => {
    setGuestId(getGuestId());
  }, []);

  const value = {
    isMobile,
    scrolled,
    toggleDrawer,
    drawerOpen,
    toggleDetailsDrawer,
    detailsDrawer,
    userLocation,
    setUserLocation,
    guestId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
