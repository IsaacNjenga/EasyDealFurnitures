import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export function DrawerProvider({ children }) {
  const [openReview, setOpenReview] = useState(false);
  const [openEditReview, setOpenEditReview] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);

  const toggleReview = () => setOpenReview(!openReview);
  const toggleEditReview = () => setOpenEditReview(!openEditReview);
  const toggleSchedule = () => setOpenSchedule(!openSchedule);

  const value = {
    openReview,
    toggleReview,
    toggleSchedule,
    toggleEditReview,
    openSchedule,
    openEditReview,
    setOpenEditReview,
  };
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}
