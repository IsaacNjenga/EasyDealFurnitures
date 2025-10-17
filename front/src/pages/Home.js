import { useState } from "react";
import { Carousel, Image, Button, Typography, Row, Col } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import { ArrowRightOutlined } from "@ant-design/icons";
import "../assets/css/home.css";
import { bestSellersGrid, newArrivalsGrid } from "../assets/data/data";
import ViewItem from "../components/ViewItem";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

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
const Banner1 = ({ isMobile, scrolled, navigate }) => (
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
      transition: "all 0.2s ease-in-out",
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
      onClick={() => navigate("/shop")}
      iconPosition="end"
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      Explore
    </Button>
  </motion.div>
);

const Banner2 = ({ isMobile, scrolled, navigate }) => (
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
      transition: "all 0.2s ease-in-out",
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
      onClick={() => navigate("/shop")}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      Shop the Collection
    </Button>
  </motion.div>
);

const Collections = () => {
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
                  height: 250,
                  width: 250,
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
                  transition={{ duration: 0.3, ease: "easeOut" }}
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

const BestSellers = ({ setLoading, setContent, setOpenModal, isMobile }) => {
  const viewItem = (content) => {
    setLoading(true);
    setContent(content);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  return (
    <div style={{ margin: "30px 10px", padding: "20px 15px" }}>
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
          CRAFTED FOR YOUR COMFORT
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
        Our Best Sellers
      </Title>

      <div>
        <ItemCard
          dataSource={bestSellersGrid}
          isMobile={isMobile}
          viewItem={viewItem}
        />
      </div>
    </div>
  );
};

const ComfortSection = ({ isMobile, navigate }) => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={officeImage}
        alt="img"
        height={300}
        width="100%"
        style={{
          objectFit: isMobile ? "contain" : "cover",
          maxWidth: "100%",
          height: "100%",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <motion.div
        key="comfortsection"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
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
          alignItems: "flex-end",
          textAlign: "right",
          background: "rgba(0,0,0,0.35)",
          transition: "all 0.2s ease-in-out",
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
          PREMIUM QUALITY PRODUCTS
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
          Crafted For Comfort
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
          Elevate your style with our curated essentials. Limited-time offers on
          new arrivals.
        </Text>
        <Button
          style={btnStyle}
          icon={<ArrowRightOutlined />}
          onClick={() => navigate("/shop")}
          iconPosition="end"
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          VIEW PRODUCTS
        </Button>
      </motion.div>
    </div>
  );
};

const NewArrivals = ({ setLoading, setContent, setOpenModal, isMobile }) => {
  const viewItem = (content) => {
    setLoading(true);
    setContent(content);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  return (
    <div style={{ margin: "30px 10px", padding: "20px 15px" }}>
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
          FRESH DESIGNS JUST LANDED
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
        Our New Arrivals
      </Title>

      <div>
        <ItemCard
          dataSource={newArrivalsGrid}
          isMobile={isMobile}
          viewItem={viewItem}
        />
      </div>
    </div>
  );
};

const DiscoverSection = ({ isMobile, navigate }) => {
  return (
    <div
      style={{
        marginTop: 0,
        padding: 0,
        marginBottom: 0,
        background:
          'url("https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg") center center no-repeat fixed',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: 500,
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          borderRadius: 0,
          padding: 0,
        }}
      >
        <Title
          level={1}
          style={{
            margin: 0,
            fontFamily: "DM Sans",
            color: "whitesmoke",
          }}
        >
          Smart Designs For Modern Living
        </Title>
        <Text
          style={{
            width: isMobile ? "80%" : "35%",
            margin: "10px auto",
            fontFamily: "DM Sans",
            color: "whitesmoke",
            fontSize: 20,
          }}
        >
          Maximise your space with verstaile, sleek furniture. Built to last,
          styled to impress
        </Text>
        <div>
          <Button
            type="primary"
            onClick={() => navigate("/shop")}
            style={{
              background: "transparent",
              color: "white",
              border: "1px solid white",
              fontFamily: "DM Sans",
              padding: "20px 26px",
              borderRadius: 0,
              marginTop: 20,
              letterSpacing: 1,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            DISCOVER NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { isMobile, scrolled } = useUser();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

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
            <Banner1
              key="b1"
              isMobile={isMobile}
              scrolled={scrolled}
              navigate={navigate}
            />
          ) : (
            <Banner2
              key="b2"
              isMobile={isMobile}
              scrolled={scrolled}
              navigate={navigate}
            />
          )}
        </AnimatePresence>
      </div>

      <Collections isMobile={isMobile} navigate={navigate} />

      <BestSellers
        isMobile={isMobile}
        setLoading={setLoading}
        setContent={setContent}
        setOpenModal={setOpenModal}
        navigate={navigate}
      />

      <ComfortSection isMobile={isMobile} navigate={navigate} />

      <NewArrivals
        isMobile={isMobile}
        setLoading={setLoading}
        setContent={setContent}
        setOpenModal={setOpenModal}
        navigate={navigate}
      />

      <DiscoverSection isMobile={isMobile} navigate={navigate} />

      {/* view modal */}
      <ViewItem
        setOpenModal={setOpenModal}
        isMobile={isMobile}
        openModal={openModal}
        loading={loading}
        content={content}
      />
    </>
  );
}
