import {
  CloseOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Modal,
  Row,
  Tooltip,
  Typography,
  Card,
  Badge,
  Space,
  Divider,
} from "antd";
import { CartFunctions } from "../utils/CartFunctions";
import { WishFunctions } from "../utils/WishFunctions";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const { Title, Paragraph, Text } = Typography;

function ViewItem({ loading, openModal, setOpenModal, content, isMobile }) {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, isInCart } = CartFunctions();
  const { addToWish, removeFromWish, isInWish } = WishFunctions();
  const openNotification = useNotification();

  const discountedPrice =
    content?.discount > 0
      ? ((100 - content?.discount) * content?.price) / 100
      : content?.price;

  return (
    <AnimatePresence>
      {openModal && content && (
        <Modal
          footer={null}
          open={openModal}
          centered
          onCancel={() => setOpenModal(false)}
          confirmLoading={loading}
          width={isMobile ? "100vw" : "85vw"}
          style={{
            top: 0,
          }}
          styles={{
            mask: { backdropFilter: "blur(2px)" },
            content: {
              background: "linear-gradient(135deg, #1b1b27, #242437 100%)",
              border: "none",
              borderRadius: 12,
              overflow: "hidden",
              padding: 0,
            },
          }}
          closeIcon={
            <CloseOutlined
              style={{
                color: "#fff",
                fontSize: 20,
                background: "rgba(0,0,0,0.5)",
                borderRadius: "50%",
                padding: 4,
              }}
            />
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ position: "relative" }}>
              <Row
                gutter={[0, 0]}
                style={{ minHeight: isMobile ? "auto" : 450 }}
              >
                {/* Left Side - Image Carousel */}
                <Col
                  xs={24}
                  sm={24}
                  md={14}
                  style={{
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    height: "100%",
                    minHeight: 450,
                  }}
                >
                  <Carousel autoplay autoplaySpeed={4000}>
                    {content.img.map((img, i) => (
                      <div key={i}>
                        <div
                          style={{
                            height: 570,
                            background: `url(${img}) center/cover`,
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: "50%",
                              background:
                                "linear-gradient(to top, #ffa4495e ,transparent)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </Col>

                {/* Right Side - Product Details */}
                <Col
                  xs={24}
                  sm={24}
                  md={10}
                  style={{
                    background: "#ffffff",
                    padding: isMobile ? "30px 20px" : "34px 28px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Space
                    direction="vertical"
                    size={16}
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        justifyContent: "left",
                        alignContent: "center",
                      }}
                    >
                      {/* Product Name */}
                      <div>
                        <Title
                          level={isMobile ? 3 : 2}
                          style={{
                            margin: 0,
                            fontFamily: "DM Sans",
                            letterSpacing: 0.5,
                            color: "#1a1a1a",
                            lineHeight: 1.3,
                          }}
                        >
                          {content?.name}
                        </Title>
                      </div>

                      {/* Type Badge */}
                      <div>
                        <Badge
                          count={content?.type?.toUpperCase()}
                          style={{
                            backgroundColor: "#ffa449",
                            color: "#fff",
                            fontFamily: "DM Sans",
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "4px 12px",
                            height: "auto",
                          }}
                        />
                      </div>
                    </div>

                    {/* Price Section */}
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
                      <Card
                        style={{
                          background:
                            "linear-gradient(135deg, #ffa449 0%, #ff8c1a 100%)",
                          border: "none",
                          borderRadius: 12,
                        }}
                        styles={{ body: { padding: "20px 24px" } }}
                      >
                        <Space direction="vertical" size={4}>
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
                              <Space size={12} align="center">
                                <Title
                                  level={2}
                                  style={{
                                    color: "#fff",
                                    margin: 0,
                                    fontFamily: "DM Sans",
                                    fontWeight: 700,
                                  }}
                                >
                                  KES {discountedPrice.toLocaleString()}
                                </Title>
                                <Text
                                  delete
                                  style={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: 18,
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
                                }}
                              >
                                KES {content?.price.toLocaleString()}
                              </Title>
                            )}
                          </div>
                          {content?.discount > 0 && (
                            <div>
                              <Text
                                type="secondary"
                                style={{
                                  color: "#fff",
                                  fontSize: 12,
                                  fontFamily: "DM Sans",
                                }}
                              >
                                Offer valid until{" "}
                                {format(
                                  new Date(content?.offerEndDate),
                                  "do MMM, yyyy"
                                )}
                              </Text>
                            </div>
                          )}
                        </Space>
                      </Card>
                    </div>

                    {/* Description */}
                    <div>
                      <Paragraph
                        style={{
                          fontFamily: "Raleway",
                          fontSize: 15,
                          lineHeight: 1.7,
                          color: "#555",
                          margin: 0,
                        }}
                      >
                        {content?.description}
                      </Paragraph>
                    </div>

                    {/* Colors */}
                    {content?.colour?.length > 0 && (
                      <div>
                        <Text
                          strong
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: 14,
                            color: "#1a1a1a",
                            display: "block",
                            marginBottom: 12,
                          }}
                        >
                          Available Colors
                        </Text>
                        <Space size={8}>
                          {content?.colour.map((c, idx) => (
                            <Tooltip
                              key={idx}
                              title={c.charAt(0).toUpperCase() + c.slice(1)}
                            >
                              <div
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: "50%",
                                  backgroundColor: c,
                                  cursor: "pointer",
                                  border: "2px solid #e0e0e0",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                  transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.15)";
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
                    )}

                    <Divider style={{ margin: "8px 0" }} />

                    {/* Action Buttons */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                        gap: 20,
                      }}
                    >
                      <div>
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
                          block
                          style={{
                            width: "100%",
                            height: 50,
                            borderRadius: 8,
                            background: isInCart(content)
                              ? "#52c41a"
                              : "linear-gradient(135deg, #ffa449 0%, #ff8c1a 100%)",
                            border: "none",
                            fontFamily: "DM Sans",
                            fontSize: 16,
                            fontWeight: 600,
                            boxShadow: "0 4px 12px rgba(255, 164, 73, 0.3)",
                          }}
                        >
                          {isInCart(content) ? "IN CART" : "ADD TO CART"}
                        </Button>
                      </div>
                      <div>
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
                          block
                          style={{
                            width: "100%",
                            height: 50,
                            borderRadius: 8,
                            border: "2px solid #e0e0e0",
                            background: "#fff",
                            color: isInWish(content) ? "#ff4d4f" : "#333",
                            fontFamily: "DM Sans",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          {isInWish(content) ? "SAVED" : "SAVE TO WISHLIST"}
                        </Button>
                      </div>
                    </div>

                    {/* View More Details Link */}
                    <Button
                      type="link"
                      // onClick={toggleDetailsDrawer}
                      onClick={() =>
                        navigate(`/shop/product?id=${content?._id}`)
                      }
                      style={{
                        padding: 0,
                        height: "auto",
                        fontFamily: "DM Sans",
                        fontSize: 14,
                        color: "#ffa449",
                        fontWeight: 600,
                      }}
                    >
                      View more details →
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default React.memo(ViewItem);
