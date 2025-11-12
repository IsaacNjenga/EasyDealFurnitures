import {
  CloseOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Modal,
  Row,
  Tooltip,
  Typography,
  Image,
  Drawer,
  Card,
  Badge,
  Space,
  Divider,
} from "antd";
import DetailsDrawer from "../components/DetailsDrawer";
import { useUser } from "../context/UserContext";
import { CartFunctions } from "../utils/CartFunctions";
import { WishFunctions } from "../utils/WishFunctions";
import { useNotification } from "../context/NotificationContext";

const { Title, Paragraph, Text } = Typography;

function ViewItem({ loading, openModal, setOpenModal, content, isMobile }) {
  const { toggleDetailsDrawer, detailsDrawer } = useUser();
  const { addToCart, removeFromCart, isInCart } = CartFunctions();
  const { addToWish, removeFromWish, isInWish } = WishFunctions();
  const openNotification = useNotification();

  const discountedPrice =
    content?.discount > 0
      ? ((100 - content?.discount) * content?.price) / 100
      : content?.price;

  return (
    <>
      <Modal
        footer={null}
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        confirmLoading={loading}
        width={isMobile ? "95vw" : "85vw"}
        style={{
          maxWidth: 1200,
          top: 20,
        }}
        bodyStyle={{
          padding: 0,
          borderRadius: 16,
          overflow: "hidden",
        }}
        closeIcon={
          <CloseOutlined
            style={{
              color: "#fff",
              fontSize: 20,
              background: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              padding: 8,
            }}
          />
        }
      >
        <Row gutter={0} style={{ minHeight: isMobile ? "auto" : 500 }}>
          {/* Left Side - Image Carousel */}
          <Col
            xs={24}
            sm={24}
            md={14}
            style={{
              background: "linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%)",
              padding: isMobile ? "30px 20px" : "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ width: "100%", maxWidth: isMobile ? 300 : 500 }}>
              <Card
                style={{
                  background: "transparent",
                  borderColor: "#8d3c3c00",
                  margin: 0,
                  padding: 0,
                  borderRadius: 0,
                }}
              >
                <Carousel autoplay autoplaySpeed={4500} dots arrows>
                  {(Array.isArray(content?.img)
                    ? content?.img
                    : [content?.img]
                  ).map((img, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                      }}
                    >
                      <Image
                        src={img}
                        alt="img"
                        height={isMobile ? 300 : 500}
                        width={isMobile ? 300 : 500}
                        style={{
                          width: "auto",
                          maxHeight: "100%",
                          objectFit: isMobile ? "cover" : "contain",
                          borderRadius: 6,
                        }}
                        preview={{
                          mask: "Click to zoom",
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              </Card>
            </div>
          </Col>

          {/* Right Side - Product Details */}
          <Col
            xs={24}
            sm={24}
            md={10}
            style={{
              background: "#ffffff",
              padding: isMobile ? "30px 20px" : "40px 32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
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

                {/* Type Badge */}
                <div style={{ marginTop: 12 }}>
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
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #ffa449 0%, #ff8c1a 100%)",
                  border: "none",
                  borderRadius: 12,
                }}
                bodyStyle={{ padding: "20px 24px" }}
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
                </Space>
              </Card>

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
              )}

              <Divider style={{ margin: "8px 0" }} />

              {/* Action Buttons */}
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
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
              </Space>

              {/* Free Shipping Badge */}
              {content?.freeShipping && (
                <Card
                  size="small"
                  style={{
                    background: "#f0f9ff",
                    border: "1px solid #bae7ff",
                    borderRadius: 8,
                  }}
                  bodyStyle={{ padding: "12px 16px" }}
                >
                  <Space>
                    <TruckOutlined style={{ color: "#1890ff", fontSize: 18 }} />
                    <Text
                      strong
                      style={{
                        fontFamily: "DM Sans",
                        color: "#1890ff",
                        fontSize: 14,
                      }}
                    >
                      Free Shipping Available
                    </Text>
                  </Space>
                </Card>
              )}

              {/* View More Details Link */}
              <Button
                type="link"
                onClick={toggleDetailsDrawer}
                style={{
                  padding: 0,
                  height: "auto",
                  fontFamily: "DM Sans",
                  fontSize: 14,
                  color: "#ffa449",
                  fontWeight: 600,
                }}
              >
                View complete specifications →
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>

      {/* Details Drawer */}
      <Drawer
        title={
          <span
            style={{
              fontFamily: "DM Sans",
              fontSize: isMobile ? 22 : 28,
              color: "#1a1a1a",
              letterSpacing: 0.5,
              fontWeight: 700,
            }}
          >
            {content?.name}
          </span>
        }
        placement="right"
        width={isMobile ? "100%" : 720}
        onClose={toggleDetailsDrawer}
        open={detailsDrawer}
        styles={{
          body: { backgroundColor: "#fafafa", padding: 24 },
        }}
        keyboard
        closeIcon={
          <CloseOutlined
            style={{
              color: "#333",
              fontSize: 18,
            }}
          />
        }
        footer={
          <Space
            size={12}
            style={{ width: "100%", justifyContent: "flex-end" }}
          >
            <Button
              onClick={() => {
                if (isInCart(content)) {
                  removeFromCart(content._id);
                } else {
                  addToCart(content);
                  openNotification("success", "Item added to cart", "Success!");
                }
              }}
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              style={{
                borderRadius: 8,
                background: isInCart(content)
                  ? "#52c41a"
                  : "linear-gradient(135deg, #ffa449 0%, #ff8c1a 100%)",
                border: "none",
                fontFamily: "DM Sans",
                fontWeight: 600,
                minWidth: 160,
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
              style={{
                borderRadius: 8,
                border: "2px solid #e0e0e0",
                background: "#fff",
                color: isInWish(content) ? "#ff4d4f" : "#333",
                fontFamily: "DM Sans",
                fontWeight: 600,
                minWidth: 160,
              }}
            >
              {isInWish(content) ? "SAVED" : "SAVE"}
            </Button>
          </Space>
        }
      >
        <DetailsDrawer content={content} isMobile={isMobile} />
      </Drawer>
    </>
  );
}

export default ViewItem;
