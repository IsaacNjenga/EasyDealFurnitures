import React from "react";
import {
  Typography,
  Tag,
  Divider,
  Space,
  Tooltip,
  Carousel,
  Image,
} from "antd";
import {
  TruckOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  TagsOutlined,
  StarOutlined,
  ScissorOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const iconStyle = {
  fontSize: 20,
  transition: "all 0.3s ease",
  cursor: "pointer",
  color: "#fea549",
  marginRight: 8,
};

function DetailsDrawer({ content, isMobile }) {
  if (!content) return null;
  return (
    <div>
      {" "}
      {/* Image Gallery */}
      <div>
        {" "}
        <Carousel autoplay autoplaySpeed={3200} dots>
          {(Array.isArray(content?.img) ? content?.img : [content?.img]).map(
            (img, i) => (
              <div key={i}>
                <Image
                  src={img}
                  alt={content?._id}
                  width={"100%"}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: 0,
                  }}
                />
              </div>
            )
          )}
        </Carousel>
      </div>
      {/* Product Info */}
      <div style={{ marginBottom: 16 }}>
        <Title
          level={3}
          style={{ fontFamily: "DM Sans", marginBottom: 0, color: "#333" }}
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
        <Text style={{ color: "#888", fontFamily: "DM Sans" }}>
          {content?.type?.toUpperCase()}
        </Text>
      </div>
      {/* Rating
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Rate
          disabled
          allowHalf
          defaultValue={content.rating}
          style={{ color: "#fea549" }}
        />
        <Text style={{ marginLeft: 8, fontFamily: "DM Sans" }}>
          ({content?.totalReviews} reviews)
        </Text>
      </div> */}
      {/* Availability */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 16,
          gap: 8,
        }}
      >
        {content?.available ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        )}
        <Text
          style={{
            fontFamily: "DM Sans",
            color: content?.available ? "green" : "red",
          }}
        >
          {content?.available
            ? `In stock (${content?.stockCount} left)`
            : "Out of stock"}
        </Text>
      </div>
      {/* Material & Dimensions */}
      <div style={{ marginBottom: 16 }}>
        <Tooltip title="Material & Dimensions">
          <ScissorOutlined style={iconStyle} />
        </Tooltip>
        <Text style={{ fontFamily: "DM Sans", color: "#555" }}>
          {content?.material} — {content?.dimensions}
        </Text>
      </div>
      <Divider />
      {/* Description */}
      <Paragraph
        style={{
          fontFamily: "DM Sans",
          color: "#444",
          lineHeight: 1.6,
          fontSize: 16,
        }}
      >
        {content?.description}
      </Paragraph>
      {/* Tags */}
      <div style={{ marginBottom: 20 }}>
        <TagsOutlined style={iconStyle} />
        {content?.tags?.map((tag, i) => (
          <Tag
            key={i}
            color="rgba(254,165,73,0.1)"
            style={{
              color: "#fea549",
              fontFamily: "DM Sans",
              border: "1px solid #fea549",
              borderRadius: 8,
              marginBottom: 6,
            }}
          >
            {tag}
          </Tag>
        ))}
      </div>
      {/* Colors */}
      <div style={{ marginBottom: 20 }}>
        <Text
          strong
          style={{
            fontFamily: "DM Sans",
            color: "#333",
            display: "block",
            marginBottom: 6,
          }}
        >
          Available Colours:
        </Text>
        <Space>
          {content?.colour?.map((c, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: c,
                border: "1px solid #ddd",
              }}
            ></div>
          ))}
        </Space>
      </div>
      <Divider />
      {/* Shipping Information */}
      <div style={{ marginBottom: 20 }}>
        <TruckOutlined style={iconStyle} />
        <Text strong style={{ fontFamily: "DM Sans", color: "#333" }}>
          Shipping Information
        </Text>
        <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 24 }}>
          {content?.shippingInformation?.map((s, i) => (
            <li
              key={i}
              style={{
                fontFamily: "DM Sans",
                color: "#555",
                fontSize: 15,
                marginBottom: 4,
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
      {/* Care Guide */}
      <div>
        <InfoCircleOutlined style={iconStyle} />
        <Text strong style={{ fontFamily: "DM Sans", color: "#333" }}>
          Care Guide
        </Text>
        <Paragraph
          style={{
            fontFamily: "DM Sans",
            color: "#555",
            marginTop: 8,
            lineHeight: 1.6,
          }}
        >
          {content?.careGuide}
        </Paragraph>
      </div>
      <Divider />
      {/* Free Shipping + Discount */}
      <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
        <Tag
          color={content?.freeShipping ? "green" : "default"}
          style={{
            fontFamily: "DM Sans",
            fontSize: 14,
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          {content?.freeShipping ? (
            <>
              <TruckOutlined /> Free Shipping
            </>
          ) : (
            "Standard Shipping"
          )}
        </Tag>

        {content?.discount > 0 && (
          <Tag
            color="red"
            style={{
              fontFamily: "DM Sans",
              fontSize: 14,
              borderRadius: 8,
              padding: "4px 10px",
            }}
          >
            <StarOutlined /> {content?.discount}% OFF
          </Tag>
        )}
      </div>
    </div>
  );
}

export default DetailsDrawer;
