import React, { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Typography,
  Tag,
  Space,
  Tooltip,
  Image,
  Rate,
  Button,
  Row,
  Col,
  Card,
  Badge,
  Carousel,
  Divider,
  Spin,
} from "antd";
import {
  TruckOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  TagsOutlined,
  StarOutlined,
  ScissorOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { CartFunctions } from "../utils/CartFunctions";
import { WishFunctions } from "../utils/WishFunctions";
import { useNotification } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";
import { useDrawer } from "../context/DrawerContext";
import CreateReview from "./CreateReview";
import ReviewsDetails from "../components/ReviewsDetails";
import { useAuth } from "../context/AuthContext";
import useFetchProduct from "../hooks/fetchProduct";

const { Title, Text, Paragraph } = Typography;

// const content = {
//   _id: 4,
//   name: "Minimalist Coffee Table",
//   price: 10000,
//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//   colour: ["black", "white"],
//   type: "coffee table",
//   img: ["https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg"],
//   freeShipping: true,
//   discount: 10,
//   available: true,
//   stockCount: 12,
//   material: "Solid wood frame, memory foam headboard",
//   dimensions: "210cm x 160cm x 100cm",
//   rating: 4.7,
//   totalReviews: 126,
//   shippingInformation: [
//     "Ships within 1-2 business days",
//     "Free shipping on all orders",
//     "30-day return policy",
//   ],
//   careGuide: [
//     "Use a slightly damp, soft, lint-free cloth for regular dust removal.",
//     " Always clean in the direction of the grain.",
//   ],
//   tags: ["bedroom", "ergonomic", "modern", "furniture"],
//   category: "Living Room Furniture",
//   reviews: [
//     {
//       name: "Susan K",
//       email: "susan@email.com",
//       rating: 4.5,
//       review:
//         "Great place to live with excellent amenities and friendly neighbors. The location is perfect for families.",
//       title: "Amazing Property",
//       createdAt: "2025-01-01T00:00:00.000Z",
//       updatedAt: "2025-01-01T00:00:00.000Z",
//     },
//     {
//       name: "John N",
//       email: "john@email.com",
//       rating: 4.5,
//       review:
//         "Great place to stay. Very peaceful and secure neighborhood with easy access to shopping centers.",
//       title: "Highly Recommended",
//       createdAt: "2024-12-15T00:00:00.000Z",
//       updatedAt: "2024-12-15T00:00:00.000Z",
//     },
//     {
//       name: "Jane N",
//       email: "jane@email.com",
//       rating: 3.5,
//       review:
//         "Good property overall but could use some updates in the kitchen area.",
//       title: "Good but needs improvements",
//       createdAt: "2024-11-20T00:00:00.000Z",
//       updatedAt: "2024-11-20T00:00:00.000Z",
//     },
//   ],
// };

function ProductDetails() {
  const [searchParams] = useSearchParams();
  const { addToCart, removeFromCart, isInCart } = CartFunctions();
  const { addToWish, removeFromWish, isInWish } = WishFunctions();
  const openNotification = useNotification();
  const navigate = useNavigate();
  const { isMobile } = useUser();  
  const { productData, productDataLoading, fetchProduct } = useFetchProduct();  
  const id = searchParams.get("id");
  const { toggleReview, openReview } = useDrawer();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  //eslint-disable-next-line
  }, [id]);

  const content = useMemo(() => {
    return productData?.[0] || null;
  }, [productData]);

  // Calculate derived values with memoization
  const hasUserReviewed = useMemo(() => {
    if (!content?.reviews || !currentUser?.email) return false;
    return content.reviews.some((r) => r.email === currentUser.email);
  //eslint-disable-next-line
  }, [currentUser?.email]);

  const discountedPrice =
    content?.discount > 0
      ? ((100 - content?.discount) * content?.price) / 100
      : content?.price;

  if (!content) return null;

  if (productDataLoading) {
    return <Spin fullscreen size="large" tip="loading" />;
  }

  return (
    <div
      style={{ background: "#fafafa", minHeight: "100vh", paddingBottom: 60 }}
    >
      {/* banner */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Image
          src={content?.img[0]}
          loading="lazy"
          alt="bgImg"
          width="100%"
          height={isMobile ? 350 : 500}
          preview={false}
          style={{
            objectFit: isMobile ? "contain" : "cover",
            maxWidth: "100%",
          }}
        />
      </div>
      {/* Header Navigation */}
      <div
        style={{
          background: "#fff",
          padding: "16px 24px",
          borderBottom: "1px solid #e8e8e8",
          marginBottom: 24,
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={() => navigate("/shop")}
            style={{
              fontFamily: "DM Sans",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Back to Shop
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <Row gutter={[48, 48]}>
          {/* Left Column - Images */}
          <Col xs={24} lg={12}>
            <div style={{ position: "sticky", top: 20 }}>
              {/* Discount Badge */}
              {content?.discount > 0 && (
                <Badge.Ribbon
                  text={`${content.discount}% OFF`}
                  color="#ff4d4f"
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "DM Sans",
                    zIndex: 1000,
                    padding: "7px 12px",
                  }}
                />
              )}

              {/* Main Image */}
              <Card
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  marginBottom: 16,
                  padding: 0,
                  border: "2px solid #e8e8e8",
                }}
                //bodyStyle={{ padding: 0 }}
              >
                <Carousel autoplay autoplaySpeed={4500} dots arrows>
                  {(Array.isArray(content?.img)
                    ? content?.img
                    : [content?.img]
                  ).map((img, i) => (
                    <Image
                      src={img}
                      alt={content?.name}
                      style={{
                        width: "100%",
                        height: isMobile ? 350 : 500,
                        objectFit: "cover",
                      }}
                      preview={{
                        mask: "Click to view full image",
                      }}
                    />
                  ))}
                </Carousel>
              </Card>

              {/* Thumbnail Gallery */}
              <Row gutter={12}>
                {content?.img?.map((img, i) => (
                  <Col key={i} span={8}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        border: "2px solid #e8e8e8",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <Image
                        src={img}
                        alt={`img ${i + 1}`}
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                        }}
                        preview={false}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          {/* Right Column - Product Info */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              {/* Product Header */}
              <div>
                <Tag
                  color="orange"
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: 6,
                    marginBottom: 12,
                  }}
                >
                  {content?.category}
                </Tag>

                <Title
                  level={1}
                  style={{
                    fontFamily: "DM Sans",
                    margin: "8px 0",
                    fontSize: isMobile ? 28 : 36,
                    fontWeight: 700,
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                  }}
                >
                  {content?.name}
                </Title>

                {/* Rating */}
                <Space align="center" size={12}>
                  <Rate
                    disabled
                    allowHalf
                    value={content?.rating}
                    style={{ color: "#ffa449", fontSize: 18 }}
                  />
                  <Text style={{ fontFamily: "DM Sans", color: "#666" }}>
                    {content?.rating} ({content?.totalReviews} reviews)
                  </Text>
                </Space>
              </div>

              {/* Price Card */}
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #ffa449 0%, #ff8c1a 100%)",
                  border: "none",
                  borderRadius: 16,
                }}
                bodyStyle={{ padding: "24px 28px" }}
              >
                <Space direction="vertical" size={8}>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: 14,
                      fontFamily: "DM Sans",
                      fontWeight: 500,
                    }}
                  >
                    Price
                  </Text>
                  <div>
                    {content?.discount > 0 ? (
                      <Space size={16} align="baseline">
                        <Title
                          level={2}
                          style={{
                            color: "#fff",
                            margin: 0,
                            fontFamily: "DM Sans",
                            fontWeight: 700,
                            fontSize: 36,
                          }}
                        >
                          KES {discountedPrice.toLocaleString()}
                        </Title>
                        <Text
                          delete
                          style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: 20,
                            fontFamily: "DM Sans",
                          }}
                        >
                          KES {content?.price.toLocaleString()}
                        </Text>
                      </Space>
                    ) : (
                      <Title
                        level={2}
                        style={{
                          color: "#fff",
                          margin: 0,
                          fontFamily: "DM Sans",
                          fontWeight: 700,
                          fontSize: 36,
                        }}
                      >
                        KES {content?.price.toLocaleString()}
                      </Title>
                    )}
                  </div>
                </Space>
              </Card>

              {/* Availability */}
              <Card
                style={{
                  borderRadius: 12,
                  border: content?.available
                    ? "2px solid #52c41a"
                    : "2px solid #ff4d4f",
                  background: content?.available ? "#f6ffed" : "#fff1f0",
                }}
                bodyStyle={{ padding: "16px 20px" }}
              >
                <Space align="center">
                  {content?.available ? (
                    <CheckCircleOutlined
                      style={{ color: "#52c41a", fontSize: 20 }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{ color: "#ff4d4f", fontSize: 20 }}
                    />
                  )}
                  <Text
                    strong
                    style={{
                      fontFamily: "DM Sans",
                      color: content?.available ? "#52c41a" : "#ff4d4f",
                      fontSize: 16,
                    }}
                  >
                    {content?.available
                      ? `In Stock — ${content?.stockCount} available`
                      : "Out of Stock"}
                  </Text>
                </Space>
              </Card>

              {/* Description */}
              <div style={{ marginBottom: 0 }}>
                <Title
                  level={4}
                  style={{
                    fontFamily: "DM Sans",
                    color: "#1a1a1a",
                    marginBottom: 12,
                  }}
                >
                  About This Product
                </Title>
                <Paragraph
                  style={{
                    fontFamily: "Raleway",
                    color: "#555",
                    lineHeight: 1.8,
                    fontSize: 16,
                  }}
                >
                  {content?.description}
                </Paragraph>
              </div>
              <Divider
                style={{ margin: 0, padding: 0, borderColor: "#a972726c" }}
              />
              {/* Colors */}
              <div style={{ marginTop: 0 }}>
                <Title
                  level={5}
                  style={{
                    fontFamily: "DM Sans",
                    color: "#1a1a1a",
                    marginBottom: 12,
                  }}
                >
                  Available Colors
                </Title>
                <Space size={12}>
                  {content?.colour?.map((c, i) => (
                    <Tooltip
                      key={i}
                      title={c.charAt(0).toUpperCase() + c.slice(1)}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          backgroundColor: c,
                          border: "3px solid #e0e0e0",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.15)";
                          e.currentTarget.style.borderColor = "#ffa449";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.borderColor = "#e0e0e0";
                        }}
                      />
                    </Tooltip>
                  ))}
                </Space>
              </div>

              {/* Specifications */}
              <Card
                title={
                  <Space>
                    <ScissorOutlined style={{ color: "#ffa449" }} />
                    <Text strong style={{ fontFamily: "DM Sans" }}>
                      Specifications
                    </Text>
                  </Space>
                }
                style={{ borderRadius: 12 }}
              >
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <div>
                    <Text
                      strong
                      style={{
                        fontFamily: "DM Sans",
                        color: "#888",
                        fontSize: 13,
                      }}
                    >
                      MATERIAL
                    </Text>
                    <br />
                    <Text style={{ fontFamily: "DM Sans", fontSize: 15 }}>
                      {content?.material}
                    </Text>
                  </div>
                  <div>
                    <Text
                      strong
                      style={{
                        fontFamily: "DM Sans",
                        color: "#888",
                        fontSize: 13,
                      }}
                    >
                      DIMENSIONS
                    </Text>
                    <br />
                    <Text style={{ fontFamily: "DM Sans", fontSize: 15 }}>
                      {content?.dimensions}
                    </Text>
                  </div>
                </Space>
              </Card>

              {/* Shipping & Care */}
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    size="small"
                    style={{
                      borderRadius: 12,
                      background: "#f0f9ff",
                      border: "1px solid #bae7ff",
                      height: "auto",
                    }}
                    bodyStyle={{
                      padding: 10,
                      height: "auto",
                      overflow: "auto",
                    }}
                  >
                    <Space direction="vertical" size={8}>
                      <TruckOutlined
                        style={{ fontSize: 24, color: "#1890ff" }}
                      />
                      <Text
                        strong
                        style={{ fontFamily: "DM Sans", fontSize: 14 }}
                      >
                        Shipping
                      </Text>
                      {content?.shippingInformation.map((info, idx) => (
                        <Text
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: 12,
                            color: "#666",
                            marginTop: 0,
                            marginBottom: 0,
                          }}
                          key={idx}
                        >
                          {info}
                        </Text>
                      ))}
                    </Space>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    size="small"
                    style={{
                      borderRadius: 12,
                      background: "#fff7e6",
                      border: "1px solid #ffd591",
                      height: "auto",
                    }}
                    bodyStyle={{
                      padding: 10,
                      height: "auto",
                      overflow: "auto",
                    }}
                  >
                    <Space direction="vertical" size={8}>
                      <InfoCircleOutlined
                        style={{ fontSize: 24, color: "#fa8c16" }}
                      />
                      <Text
                        strong
                        style={{ fontFamily: "DM Sans", fontSize: 14 }}
                      >
                        Care Guide
                      </Text>{" "}
                      {content?.careGuide.map((info, idx) => (
                        <Text
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: 12,
                            color: "#666",
                            marginTop: 0,
                            marginBottom: 0,
                          }}
                          key={idx}
                        >
                          {info}
                        </Text>
                      ))}
                    </Space>
                  </Card>
                </Col>
              </Row>

              {/* Tags */}
              <div>
                <TagsOutlined
                  style={{ color: "#ffa449", fontSize: 16, marginRight: 8 }}
                />
                {content?.tags?.map((tag, i) => (
                  <Tag
                    key={i}
                    style={{
                      background: "rgba(255,164,73,0.1)",
                      color: "#ffa449",
                      fontFamily: "DM Sans",
                      border: "1px solid #ffa449",
                      borderRadius: 8,
                      padding: "4px 12px",
                      marginBottom: 8,
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>

              {/* Action Buttons */}
              <Space
                direction={isMobile ? "vertical" : "horizontal"}
                size={16}
                style={{ width: "100%" }}
              >
                <Button
                  onClick={() => {
                    if (isInCart(content)) {
                      removeFromCart(content._id);
                    } else {
                      addToCart(content);
                      openNotification(
                        "success",
                        "Item added to cart",
                        "Success!"
                      );
                    }
                  }}
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  block={isMobile}
                  style={{
                    height: 56,
                    borderRadius: 12,
                    background: isInCart(content)
                      ? "#52c41a"
                      : "linear-gradient(135deg, #ffa449 0%, #ff8c1a 100%)",
                    border: "none",
                    fontFamily: "DM Sans",
                    fontSize: 16,
                    fontWeight: 700,
                    minWidth: isMobile ? "100%" : 200,
                    boxShadow: "0 4px 16px rgba(255,164,73,0.3)",
                  }}
                >
                  {isInCart(content) ? "IN CART" : "ADD TO CART"}
                </Button>

                <Button
                  onClick={() => {
                    if (isInWish(content)) {
                      removeFromWish(content?._id);
                    } else {
                      addToWish(content);
                      openNotification(
                        "success",
                        "Item added to wishlist",
                        "Nice!"
                      );
                    }
                  }}
                  size="large"
                  icon={
                    isInWish(content) ? (
                      <HeartFilled style={{ color: "#ff4d4f" }} />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  block={isMobile}
                  style={{
                    height: 56,
                    borderRadius: 12,
                    border: "2px solid #e0e0e0",
                    background: "#fff",
                    color: isInWish(content) ? "#ff4d4f" : "#333",
                    fontFamily: "DM Sans",
                    fontSize: 16,
                    fontWeight: 700,
                    minWidth: isMobile ? "100%" : 200,
                  }}
                >
                  {isInWish(content) ? "SAVED" : "SAVE TO WISHLIST"}
                </Button>
              </Space>

              {/* Additional Info */}
              {(content?.freeShipping || content?.discount > 0) && (
                <Space size={12}>
                  {content?.freeShipping && (
                    <Tag
                      icon={<TruckOutlined />}
                      color="success"
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: 14,
                        borderRadius: 8,
                        padding: "6px 12px",
                      }}
                    >
                      Free Shipping
                    </Tag>
                  )}
                  {content?.discount > 0 && (
                    <Tag
                      icon={<StarOutlined />}
                      color="error"
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: 14,
                        borderRadius: 8,
                        padding: "6px 12px",
                      }}
                    >
                      {content?.discount}% OFF
                    </Tag>
                  )}
                </Space>
              )}
            </Space>
          </Col>
        </Row>

        {/* reviews */}
        <div style={{ marginTop: 20 }}>
          <Title>User Reviews</Title>
          <Divider />
          <ReviewsDetails
            isMobile={isMobile}
            reviews={content?.reviews}
            hasUserReviewed={hasUserReviewed}
            product={content}
            //pass refresh
          />
        </div>
      </div>

      <CreateReview
        openReview={openReview}
        content={content}
        toggleReview={toggleReview}
        isMobile={isMobile}
        //pass refresh
      />
    </div>
  );
}

export default ProductDetails;
