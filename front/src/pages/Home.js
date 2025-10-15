import React, { useState } from "react";
import { Carousel, Image, Button, Typography, Row, Col } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import { ArrowRightOutlined } from "@ant-design/icons";
import "../assets/css/home.css";

const { Title, Text } = Typography;

// ---- Images ----
const bgImgs = [
  "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg",
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
];

const officeImage =
  "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg";
const deskImg =
  "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg";
const tableImg =
  "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg";
const chairImg =
  "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg";

const collectionGrid = [
  { key: 1, img: officeImage, text: "Modern Living" },
  { key: 2, img: deskImg, text: "Office Elegance" },
  { key: 3, img: tableImg, text: "Outdoor Comfort" },
  { key: 4, img: chairImg, text: "Classic Touch" },
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
  background: "black",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 500,
  padding: "8px 28px",
  border: "2px solid black",
  transition: "all 0.3s ease-in-out",
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
    <Button
      style={btnStyle}
      icon={<ArrowRightOutlined />}
      iconPosition="end"
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
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
    <Button
      style={btnStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      Shop the Collection
    </Button>
  </motion.div>
);

const Collections = ({ isMobile }) => {
  return (
    <div style={{ margin: "30px 0", padding: "20px 0" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", margin: "10px 0" }}>
        <Text
          style={{
            letterSpacing: 3,
            color: "#fea549",
            fontFamily: "Inter",
            margin: 0,
            textShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
            fontSize: 20,
          }}
        >
          FURNITURE FOR EVERY STYLE
        </Text>
      </div>
      <Title
        level={2}
        style={{
          textAlign: "center",
          fontFamily: "DM Sans",
          margin: 0,
          letterSpacing: 1.5,
          fontWeight: 600,
        }}
      >
        Featured Collections
      </Title>

      {/* Image Grid */}
      <div style={{ margin: 20, padding: 20 }}>
        <Row gutter={[20, 20]} justify="center">
          {collectionGrid.map((c) => (
            <Col key={c.key} xs={24} sm={12} md={6}>
              <motion.div
                className="image-wrapper"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.02 },
                }}
                style={{
                  position: "relative",
                  borderRadius: "50%",
                  overflow: "hidden",
                  cursor: "pointer",
                  height: 300,
                  width: 300,
                  margin: "auto",
                }}
              >
                {/* Image */}
                <motion.img
                  src={c.img}
                  alt={c.text}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    transition: "all 0.4s ease",
                  }}
                  variants={{
                    rest: { scale: 1, filter: "brightness(100%) blur(0px)" },
                    hover: { scale: 1.05, filter: "brightness(60%) blur(2px)" },
                  }}
                />

                {/* Overlay Text */}
                <motion.div
                  variants={{
                    rest: { opacity: 0, y: 0 },
                    hover: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.3)",
                    color: "#fff",
                    borderRadius: "50%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: 24,
                      fontWeight: 700,
                      letterSpacing: 2,
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {c.text}
                  </p>
                </motion.div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

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
                filter: "brightness(70%)",
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

      <Collections isMobile={isMobile} />
    </>
  );
}
