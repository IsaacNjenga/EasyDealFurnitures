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

  const value = {
    isMobile,
    scrolled,
    toggleDrawer,
    drawerOpen,
    toggleDetailsDrawer,
    detailsDrawer,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
