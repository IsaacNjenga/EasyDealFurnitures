import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Space,
  Button,
  Carousel,
  Col,
  Modal,
  Row,
  Tooltip,
  Typography,
  InputNumber,
  Image,
  Drawer,
} from "antd";
import React from "react";
import DetailsDrawer from "../components/DetailsDrawer";
import { useUser } from "../context/UserContext";

const { Title, Paragraph, Text } = Typography;

function ViewItem({ loading, openModal, setOpenModal, content, isMobile }) {
  const { toggleDetailsDrawer, detailsDrawer } = useUser();
  return (
    <>
      <Modal
        footer={
          <Button
            type="text"
            onClick={toggleDetailsDrawer}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontFamily: "DM Sans",
              color: "#444",
            }}
          >
            View more details
          </Button>
        }
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        confirmLoading={loading}
        width={"70vw"}
        style={{ width: "auto", marginTop: 0, backgroundColor: "whitesmoke" }}
      >
        <div style={{ padding: 10, margin: 10 }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={14}>
              <Carousel autoplay autoplaySpeed={4500} dots={true} arrows>
                {(Array.isArray(content?.img)
                  ? content?.img
                  : [content?.img]
                ).map((img, i) => (
                  <div key={i}>
                    <Image
                      src={img}
                      height={isMobile ? 250 : 500}
                      alt={content?.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Title
                style={{ margin: 0, fontFamily: "DM Sans", letterSpacing: 1 }}
              >
                {content?.name}
              </Title>
              <Title
                level={3}
                style={{
                  marginTop: 0,
                  marginBottom: 20,
                  fontFamily: "DM Sans",
                }}
                type="secondary"
              >
                KES.{" "}
                {content?.discount > 0 ? (
                  <>
                    <span style={{ textDecoration: "line-through" }}>
                      {content?.price.toLocaleString()}
                    </span>{" "}
                    <span>
                      {(
                        ((100 - content?.discount) * content?.price) /
                        100
                      ).toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span>{content?.price.toLocaleString()}</span>
                )}
              </Title>
              <Paragraph style={{ fontFamily: "Raleway", marginBottom: 20 }}>
                {content?.description}
              </Paragraph>
              <div style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: "DM Sans", marginBottom: 15 }}>
                  Colours available:{" "}
                </Text>
                <br />
                {content?.colour.map((c) => (
                  <Tooltip title={c.charAt(0).toUpperCase() + c.slice(1)}>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        display: "inline-block",
                        borderRadius: "50%",
                        backgroundColor: `${c}`,
                        cursor: "pointer",
                        marginRight: 10,
                      }}
                    ></div>
                  </Tooltip>
                ))}
              </div>
              {/* add to cart */}
              <div style={{ marginBottom: 20 }}>
                <Space.Compact>
                  <InputNumber
                    min={1}
                    keyboard
                    defaultValue={1}
                    style={{
                      borderRadius: 4,
                      border: "1px solid #333",
                    }}
                  />
                  <Button
                    type="primary"
                    style={{
                      borderRadius: 4,
                      border: "1px solid #333",
                      background: 0,
                      color: "#333",
                      fontFamily: "DM Sans",
                      padding: "12px 18px",
                    }}
                  >
                    ADD TO CART
                  </Button>
                </Space.Compact>
              </div>

              <div style={{ marginBottom: 0 }}>
                {content?.freeShipping && (
                  <Text style={{ fontFamily: "DM Sans" }}>
                    Free Shipping <CheckCircleOutlined />
                  </Text>
                )}
              </div>
              <div>
                <Text style={{ fontFamily: "DM Sans" }}>
                  TYPE: {content?.type.toUpperCase()}
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
      <Drawer
        placement="right"
        width={isMobile ? 300 : 500}
        onClose={toggleDetailsDrawer}
        open={detailsDrawer}
        style={{ backgroundColor: "#ffa44a" }}
        closeIcon={
          <CloseOutlined
            style={{
              color: "#333",
            }}
          />
        }
      >
        <DetailsDrawer />
      </Drawer>
    </>
  );
}

export default ViewItem;
