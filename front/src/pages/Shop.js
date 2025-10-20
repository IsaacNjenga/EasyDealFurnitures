import React, { useMemo, useState } from "react";
import { Image, Spin, Typography } from "antd";
import { useUser } from "../context/UserContext";
import "../assets/css/shop.css";
import { shopProducts } from "../assets/data/data";
import ViewItem from "../components/ViewItem";
import ItemCard from "../components/ItemCard";
import emptyImg from "../assets/images/Empty.png";

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
    img: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg",
    link: "/shop",
  },
  {
    key: 3,
    title: "Kitchen Furniture",
    img: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg",
    link: "/shop",
  },
  {
    key: 4,
    title: "Outdoor Furniture",
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    link: "/shop",
  },
  {
    key: 5,
    title: "Living Room Furniture",
    img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    link: "/shop",
  },
  {
    key: 6,
    title: "Second-Hand Items",
    img: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
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
  const [selectedTab, setSelectedTab] = useState("");

  const filteredProducts = useMemo(() => {
    if (selectedTab === "") return shopProducts;
    return shopProducts.filter((p) => p.category === selectedTab);
  }, [selectedTab]);

  const tabSelector = (name) => {
    setSelectedTab(name);
  };

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
          className="scroll-container"
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
                transition: "all 0.25s ease-in-out",

                // border:
                //   selectedTab === s.title
                //     ? "4px solid #fea549"
                //     : "2px solid transparent",
                // boxShadow:
                //   selectedTab === s.title
                //     ? "0 4px 12px rgba(0,0,0,0.55)"
                //     : "none",
              }}
              key={s.key}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() => tabSelector(s.title)}
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
                    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                  }}
                >
                  {s.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Title
        style={{ margin: "auto", textAlign: "center", fontFamily: "DM Sans" }}
      >
        {selectedTab === "" ? "All Products" : selectedTab}
      </Title>

      {/* products */}
      <div>
        {loading && (
          <Spin
            size="large"
            style={{ display: "block", margin: "40px auto" }}
          />
        )}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 40,
              display: "flex",
              gap: 10,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              type="secondary"
              style={{ fontFamily: "DM Sans", fontSize: 18 }}
            >
              Sorry, no products found in this category.
            </Text>
            <Image
              src={emptyImg}
              alt="empty_img"
              preview={false}
              width={350}
              height={350}
              style={{
                margin: "0 auto",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          <ItemCard
            dataSource={selectedTab === "" ? shopProducts : filteredProducts}
            isMobile={isMobile}
            viewItem={viewItem}
          />
        )}
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
