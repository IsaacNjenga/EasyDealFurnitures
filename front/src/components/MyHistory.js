import React from "react";
import ListCard from "./ListCard";

const historyData = [
  {
    _id: 1,
    img: "https://images.unsplash.com/photo-1704655295066-681e61ecca6b?w=900",
    name: "Executive Desk",
    price: 35000,
  },
  {
    _id: 2,
    img: "https://images.unsplash.com/photo-1729551610680-c6ea05b08937?w=900",
    name: "Executive Chair",
    price: 35000,
  },
  {
    _id: 3,
    img: "https://images.unsplash.com/photo-1762417691650-f2e4bcca7eaf?w=900",
    name: "Executive Lamp",
    price: 35000,
  },
  {
    _id: 4,
    img: "https://images.unsplash.com/photo-1704655295066-681e61ecca6b?w=900",
    name: "Executive Table",
    price: 35000,
  },
  {
    _id: 5,
    img: "https://images.unsplash.com/photo-1729551610680-c6ea05b08937?w=900",
    name: "Executive Chair",
    price: 35000,
  },
];
function MyHistory() {
  return (
    <div>
      <ListCard data={historyData} />
    </div>
  );
}

export default MyHistory;
