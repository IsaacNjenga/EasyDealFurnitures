import React, { useState } from "react";
import { Image, Typography } from "antd";
import { useUser } from "../context/UserContext";
import "../assets/css/shop.css";
import { shopProducts } from "../assets/data/data";
import ViewItem from "../components/ViewItem";
import ItemCard from "../components/ItemCard";

const { Title, Text } = Typography;

const bannerImg =
  "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg";

const selectableItems = [
  {
    key: 1,
    title: "Office Furniture",
    img: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg",
    link: "/shop",
  },
  {
    key: 2,
    title: "Bedroom Furniture",
    img: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg",
    link: "/shop",
  },
  {
    key: 3,
    title: "Kitchen Furniture",
    img: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg",
    link: "/shop",
  },
  {
    key: 4,
    title: "Outdoor Furniture",
    img: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg",
    link: "/shop",
  },
  {
    key: 5,
    title: "Living Room Furniture",
    img: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg",
    link: "/shop",
  },
  {
    key: 6,
    title: "Second-Hand Items",
    img: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg",
    link: "/shop",
  },
];

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

function Shop() {
  const { isMobile } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewItem = (content) => {
    setLoading(true);
    setContent(content);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };
  return (
    <div>
      {/* banner */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Image
          src={bannerImg}
          alt="bgImg"
          width="100%"
          height={isMobile ? 350 : 500}
          preview={false}
          style={{
            objectFit: isMobile ? "contain" : "cover",
            maxWidth: "100%",
          }}
        />
        <div style={heroStyle}>
          <Title style={{ fontFamily: "DM Sans", color: "#fff" }}>
            Products
          </Title>
        </div>
      </div>

      {/* selectableItems */}
      <div
        style={{
          margin: isMobile ? "20px 32px" : "40px 64px",
          padding: isMobile ? 12 : 28,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: isMobile ? 20 : 40,
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            paddingBottom: isMobile ? 20 : 40,
          }}
        >
          {selectableItems.map((s) => (
            <div
              style={{
                position: "relative",
                cursor: "pointer",
                maxHeight: isMobile ? 150 : 200,
                maxWidth: 200,
                flexShrink: 0,
                transition: "all 0.25s ease-in-out",
              }}
              key={s.key}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={s.img}
                alt="img"
                style={{
                  width: isMobile ? "150px" : "200px",
                  height: isMobile ? "150px" : "200px",
                  objectFit: "cover",
                  marginBottom: 20,
                  borderRadius: 20,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.13)",
                  color: "#fff",
                  borderRadius: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? 20 : 24,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  {s.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* products */}
      <div>
        <ItemCard
          dataSource={shopProducts}
          isMobile={isMobile}
          viewItem={viewItem}
        />
      </div>

      <ViewItem
        isMobile={isMobile}
        setOpenModal={setOpenModal}
        openModal={openModal}
        loading={loading}
        content={content}
      />
    </div>
  );
}

export default Shop;
