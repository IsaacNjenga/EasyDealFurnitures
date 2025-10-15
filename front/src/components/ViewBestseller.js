import { CheckCircleOutlined } from "@ant-design/icons";
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
} from "antd";
import React from "react";

const { Title, Paragraph, Text } = Typography;

function ViewBestseller({ loading, openModal, setOpenModal, content }) {
  return (
    <Modal
      footer={
        <Text
          type="secondary"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontFamily: "DM Sans",
          }}
        >
          View more details
        </Text>
      }
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={"70vw"}
      style={{ width: "auto", marginTop: 0, backgrooundColor: "whitesmoke" }}
    >
      <div style={{ padding: 10, margin: 10 }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={15}>
            <Carousel autoplay autoplaySpeed={4500} dots={true} arrows>
              {(Array.isArray(content?.img)
                ? content?.img
                : [content?.img]
              ).map((img, i) => (
                <div key={i}>
                  <img
                    src={img}
                    alt={content?.name}
                    style={{
                      width: "100%",
                      height: "500px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col xs={24} sm={24} md={9}>
            <Title
              style={{ margin: 0, fontFamily: "DM Sans", letterSpacing: 1 }}
            >
              {content?.name}
            </Title>
            <Title
              level={3}
              style={{ marginTop: 0, marginBottom: 20, fontFamily: "DM Sans" }}
              type="secondary"
            >
              KES. {content?.price.toLocaleString()}
            </Title>
            <Paragraph style={{ fontFamily: "Raleway", marginBottom: 20 }}>
              {content?.description}
            </Paragraph>
            <div style={{ marginBottom: 20 }}>
              <Text strong style={{ fontFamily: "DM Sans", marginBottom: 10 }}>
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
                    border: "2px solid #333",
                    background: 0,
                    color: "#333",
                    fontFamily: "DM Sans",
                    fontWeight: 700,
                    padding: "12px 18px",
                  }}
                >
                  ADD TO CART
                </Button>
              </Space.Compact>
            </div>

            <div style={{ marginBottom: 10 }}>
              {content?.freeShipping && (
                <Text style={{ color: "green", fontFamily: "DM Sans" }}>
                  Free Shipping <CheckCircleOutlined />
                </Text>
              )}
            </div>
            <div>
              <Text style={{ fontFamily: "DM Sans" }}>
                <strong>TYPE:</strong> {content?.type.toUpperCase()}
              </Text>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default ViewBestseller;
