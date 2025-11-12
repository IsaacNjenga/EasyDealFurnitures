import React, { useState } from "react";
import { Image, Typography } from "antd";
import { useUser } from "../context/UserContext";
import emptyImg from "../assets/images/Empty-Wish.png";
import { Link } from "react-router-dom";
import { useWish } from "../context/WishContext";
import ItemCard from "../components/ItemCard";
import ViewItem from "../components/ViewItem";

const { Title, Text } = Typography;

const bannerImg =
  "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg";

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

function Wishlist() {
  const { isMobile } = useUser();
  const { liveWishItems } = useWish();
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
            MY WISHLIST
          </Title>
        </div>
      </div>

      <div style={{ margin: "30px 0", padding: "20px 0" }}>
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
            FURNITURE FOR YOUR LIFESTYLE
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
          You Ask, We Deliver
        </Title>
      </div>

      <div>
        {liveWishItems.length === 0 ? (
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
              Seems like there are no items in your wishlist. Click{" "}
              <Link to="/shop">here</Link> to add some
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
          <div style={{ margin: "10px 10px", padding: "10px 15px" }}>
            <ItemCard
              dataSource={liveWishItems}
              isMobile={isMobile}
              viewItem={viewItem}
            />
          </div>
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

export default Wishlist;
