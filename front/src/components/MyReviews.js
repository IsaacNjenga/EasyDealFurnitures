import {
  CaretRightOutlined,
  CalendarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Card, Collapse, Rate, Tag, Typography, Avatar, Empty } from "antd";
import ItemCard from "./ItemCard";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "../context/UserContext";

const { Title, Text, Paragraph } = Typography;

const ReviewUI = ({ review, item }) => {
  const { isMobile } = useUser();

  return (
    <div style={{ padding: "8px 0" }}>
      <Card
        style={{
          borderRadius: 16,
          background: "linear-gradient(135deg, #7784bc15 0%, #9178aa15 100%)",
          border: "1px solid #e8e8f5",
          marginBottom: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          backgroundFilter: "blur(4px)",
        }}
        bodyStyle={{ padding: 20 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar
              size={56}
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {review.name[0]}
            </Avatar>
            <div>
              <Text
                strong
                style={{ fontSize: 16, display: "block", marginBottom: 4 }}
              >
                {review.name}
              </Text>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Rate
                  disabled
                  allowHalf
                  value={review.rating}
                  style={{ fontSize: 16 }}
                />
                <Text strong style={{ color: "#faad14", fontSize: 16 }}>
                  {review.rating}
                </Text>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Tag
              icon={<CalendarOutlined />}
              style={{
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                padding: "4px 12px",
              }}
            >
              {formatDistanceToNow(review.createdAt)} ago
            </Tag>
          </div>
        </div>

        <Paragraph
          style={{
            fontFamily: "Raleway",
            fontSize: 15,
            lineHeight: 1.7,
            color: "#475569",
            margin: 0,
            padding: 16,
            background: "white",
            borderRadius: 12,
            border: "1px solid #f0f0f0",
          }}
        >
          "{review.review}"
        </Paragraph>
      </Card>

      <div style={{ margin: "auto", width: isMobile ? "100%" : "50%" }}>
        <ItemCard dataSource={item} />
      </div>
    </div>
  );
};

function MyReviews({ reviewsData }) {
  const clientReviews = reviewsData;

  const items = clientReviews?.map((review) => ({
    key: review._id,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <StarFilled style={{ color: "#faad14", fontSize: 18 }} />
        <div>
          <Text
            strong
            style={{ fontSize: 15, display: "block", fontFamily: "Raleway" }}
          >
            {review.title}
          </Text>
          <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
            {review.productId?.name} • {review.productId?.type}
          </Text>
        </div>
      </div>
    ),
    children: <ReviewUI review={review} item={review.productId} />,
  }));

  return (
    <div style={{ padding: 0 }}>
      <div style={{ marginBottom: 24, padding: "0 20px" }}>
        <Title level={2} style={{ fontFamily: "Raleway", marginBottom: 8 }}>
          <span>My Reviews</span>
          <StarFilled style={{ color: "gold", marginLeft: 8 }} />
        </Title>
        <Text style={{ color: "#64748b", fontSize: 15 }}>
          View all your property reviews and ratings
        </Text>
      </div>

      {clientReviews?.length === 0 ? (
        <Empty description="Seems like your reviews list is empty. Be sure to review some properties." />
      ) : (
        <Collapse
          bordered={false}
          defaultActiveKey={[clientReviews[0]?._id]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 90 : 0}
              style={{ fontSize: 16, color: "#919075" }}
            />
          )}
          items={items}
          style={{
            background: "#c8c7c22b",
          }}
          expandIconPosition="end"
        />
      )}
    </div>
  );
}

export default MyReviews;
