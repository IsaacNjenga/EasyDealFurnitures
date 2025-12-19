import kitchen from "../assets/images/kitchen.jpg";
import bedroom from "../assets/images/bedroom.jpg";
import living from "../assets/images/living-room.jpg";
import office from "../assets/images/office.jpg";
import outdoor from "../assets/images/outdoor.jpg";
import secondHand from "../assets/images/second-hand.jpg";
import { Carousel, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: "#fff",
  padding: "10px 20px",
};

export const selectableItems = [
  {
    key: 1,
    title: "Office Furniture",
    img: office,
    link: "/shop",
  },
  {
    key: 2,
    title: "Bedroom Furniture",
    //img: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg",
    img: bedroom,
    link: "/shop",
  },
  {
    key: 3,
    title: "Kitchen Furniture",
    //img: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg",
    img: kitchen,
    link: "/shop",
  },
  {
    key: 4,
    title: "Outdoor Furniture",
    //img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    img: outdoor,
    link: "/shop",
  },
  {
    key: 5,
    title: "Living Room Furniture",
    //img: "https://images.unsplash.com/photo-1680503397671-caa25818d36f?w=900",
    img: living,
    link: "/shop",
  },
  {
    key: 6,
    title: "Second-Hand Items",
    //img: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
    img: secondHand,
    link: "/shop",
  },
];

const bannerImages = [
  {
    key: 1,
    img: "https://plus.unsplash.com/premium_photo-1683120739323-0a920bdb15a4?w=900",
  },
  {
    key: 2,
    img: "https://plus.unsplash.com/premium_photo-1681980018817-b36ab8848616?w=900",
  },
  {
    key: 3,
    img: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=900",
  },
  {
    key: 4,
    img: "https://images.unsplash.com/photo-1531904300735-5f40721f712f?w=900",
  },
  {
    key: 5,
    img: "https://images.unsplash.com/photo-1715090576114-c07384af2069?w=900",
  },
  {
    key: 6,
    img: "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?w=900",
  },
  {
    key: 7,
    img: "https://images.unsplash.com/photo-1622126807280-9b5b32b28e77?w=900",
  },
  {
    key: 8,
    img: "https://plus.unsplash.com/premium_photo-1674826272761-b63a50e895da?w=900",
  },
];

export const BannerDiv = ({ isMobile }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      style={{
        position: "relative",
        height: isMobile ? 300 : 500,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bannerImages[activeIndex].img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          transform: "scale(1.15)",
          transition: "background-image 0.8s ease-in-out",
          zIndex: 1,
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.43)",
          zIndex: 2,
        }}
      />

      {/* Foreground Carousel Container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          width: "100%",
          maxWidth: 800,
          height: isMobile ? "auto" : "100%",
        }}
      >
        <Carousel
          autoplay
          autoplaySpeed={4000}
          beforeChange={(_, next) => setActiveIndex(next)}
          fade
          dots={false}
        >
          {bannerImages.map((img) => (
            <div
              key={img.key}
              style={{
                height: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={img.img}
                alt="_img"
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Hero content */}
      <div style={{ ...heroStyle, zIndex: 4 }}>
        <Title style={{ fontFamily: "DM Sans", color: "#fff" }}>
          Our Products
        </Title>
      </div>
    </div>
  );
};
