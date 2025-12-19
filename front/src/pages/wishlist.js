import { Col, Image, Row, Typography } from "antd";
import { useUser } from "../context/UserContext";
import emptyImg from "../assets/images/Empty-Wish.png";
import { Link } from "react-router-dom";
import { useWish } from "../context/WishContext";
import ItemCard from "../components/ItemCard";

const { Title, Text } = Typography;

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

  return (
    <div>
      {/* banner */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Image
          src={
            "https://images.unsplash.com/photo-1738659227425-3a2c27f2983b?w=900"
          }
          alt="bgImg"
          width="100%"
          loading="lazy"
          height={isMobile ? 350 : 600}
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
            <Row gutter={[32, 32]}>
              {liveWishItems.map((c) => (
                <Col key={c._id} xs={24} sm={12} md={6}>
                  <ItemCard dataSource={c} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
