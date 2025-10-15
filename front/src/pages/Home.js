import React, { useState } from "react";
import { Carousel, Image, Button, Typography } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// ---- Images ----
const bgImgs = [
  "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg",
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
];

// ---- Shared Styles ----
const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 5%",
  color: "#fff",
  zIndex: 2,
};

const btnStyle = {
  color: "#fff",
  background: "rgba(0,0,0,0)",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 500,
  padding: "8px 28px",
  border: "2px solid #fff",
  transition: "0.3s",
  height: 50,
  fontFamily: "Inter",
};

// ---- Animations ----
const fadeVariants = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeIn" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.6, ease: "easeOut" } },
};

// ---- Banners ----
const Banner1 = ({ isMobile, scrolled }) => (
  <motion.div
    key="banner1"
    variants={fadeVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{
      ...heroStyle,
      alignItems: "flex-start",
      textAlign: "left",
      background: scrolled ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
      transition: "all 0.4s ease-in-out",
    }}
  >
    <Text
      style={{
        letterSpacing: 4,
        color: "#fea549",
        fontFamily: "Inter",
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
      }}
    >
      MINIMAL MEETS FUNCTIONAL
    </Text>

    <Title
      level={2}
      style={{
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: isMobile ? 36 : 64,
        lineHeight: 1.1,
        fontWeight: 700,
        color: "#fff",
        maxWidth: isMobile ? "100%" : "50%",
        margin: 0,
        letterSpacing: 2.5,
      }}
    >
      Modern Furniture for Every Space
    </Title>
    <Text
      style={{
        color: "#f0f0f0",
        fontSize: isMobile ? 18 : 22,
        maxWidth: isMobile ? "100%" : "50%",
        marginBottom: 20,
        fontFamily: "Raleway",
      }}
    >
      Discover curated pieces that blend artistry, emotion, and everyday
      comfort.
    </Text>
    <Button style={btnStyle} icon={<ArrowRightOutlined />} iconPosition="end">
      Explore
    </Button>
  </motion.div>
);

const Banner2 = ({ isMobile, scrolled }) => (
  <motion.div
    key="banner2"
    variants={fadeVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{
      ...heroStyle,
      alignItems: "flex-end",
      textAlign: "right",
      background: scrolled ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
      transition: "all 0.4s ease-in-out",
    }}
  >
    <Text
      style={{
        letterSpacing: 4,
        color: "#fea549",
        fontFamily: "Inter",
        margin: 0,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
      }}
    >
      TIMELESS ELEGANCE
    </Text>
    <Title
      level={2}
      style={{
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: isMobile ? 36 : 64,
        lineHeight: 1.1,
        fontWeight: 700,
        color: "#fff",
        maxWidth: isMobile ? "100%" : "50%",
        margin: 0,
        letterSpacing: 2.5,
      }}
    >
      Redefine Comfort and Luxury
    </Title>
    <Text
      style={{
        color: "#f0f0f0",
        fontSize: isMobile ? 18 : 22,
        maxWidth: isMobile ? "100%" : "50%",
        marginBottom: 20,
        fontFamily: "Raleway",
      }}
    >
      Thoughtfully designed pieces that evoke sophistication and emotional
      depth.
    </Text>
    <Button style={btnStyle}>Shop the Collection</Button>
  </motion.div>
);

export default function Home() {
  const { isMobile, scrolled } = useUser();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Carousel */}
        <Carousel
          autoplay
          autoplaySpeed={6500}
          dots={false}
          //effect="fade"
          beforeChange={(from, to) => setActiveSlide(to)}
        >
          {bgImgs.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`bg-${index}`}
              preview={false}
              width="100%"
              height={isMobile ? 400 : 700}
              style={{
                objectFit: "cover",
                filter: "brightness(60%)",
              }}
            />
          ))}
        </Carousel>

        {/* Animated Banners */}
        <AnimatePresence mode="wait">
          {activeSlide === 0 ? (
            <Banner1 key="b1" isMobile={isMobile} scrolled={scrolled} />
          ) : (
            <Banner2 key="b2" isMobile={isMobile} scrolled={scrolled} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
