import { useState } from "react";
import {
  Typography,
  Space,
  Rate,
  Button,
  Row,
  Col,
  Card,
  Avatar,
  Select,
  Skeleton,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  StarOutlined,
  StarFilled,
  EditOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDrawer } from "../context/DrawerContext";
import { formatDistanceToNowStrict } from "date-fns";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";
import EditReview from "../pages/EditReview";

const { Title, Text, Paragraph } = Typography;

function ReviewsDetails({
  isMobile,
  hasUserReviewed,
  product,
  productDataLoading,
}) {
  const reviews = product?.reviews;
  const { toggleReview, toggleEditReview, openEditReview } = useDrawer();
  const { userLoggedIn, currentUser, setOpenAuthModal } = useAuth();

  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editContent, setEditContent] = useState({});
  const openNotification = useNotification();

  const averageRating =
    reviews?.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  // Calculate rating distribution
  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating >= 4 && r.rating < 5).length,
    3: reviews.filter((r) => r.rating >= 3 && r.rating < 4).length,
    2: reviews.filter((r) => r.rating >= 2 && r.rating < 3).length,
    1: reviews.filter((r) => r.rating >= 1 && r.rating < 2).length,
  };

  const editReview = (id) => {
    if (userLoggedIn) {
      const review = reviews?.find((r) => r._id === id);
      if (review) {
        toggleEditReview();
        setEditContent({
          ...product,
          reviews: review,
        });
      }
    } else {
      setOpenAuthModal(true);
    }
  };

  const deleteReview = async (reviewId) => {
    if (!userLoggedIn) {
      setOpenAuthModal(true);
      return;
    }

    try {
      const res = await axios.delete(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/delete-review?id=${reviewId}&email=${currentUser.email}`
      );
      if (res.data.success) {
        openNotification("success", "Your review has been deleted", "Success!");
        //propertyRefresh();
      }
    } catch (error) {
      console.error(error);
      openNotification(
        "warning",
        "Something went wrong. Please try again or contact us for assistance",
        "There was an error..."
      );
    }
  };

  return (
    <>
      <div>
        {/* Reviews Summary Card */}
        <Card
          style={{
            background: "#fff",
            borderRadius: 20,
            marginBottom: 32,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            border: "none",
          }}
          bodyStyle={{ padding: isMobile ? 24 : 32 }}
        >
          <Row gutter={[24, 24]} align="middle">
            <Col
              xs={24}
              md={8}
              style={{ textAlign: isMobile ? "center" : "left" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMobile ? "center" : "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                  }}
                >
                  <Title
                    level={1}
                    style={{
                      margin: 0,
                      fontSize: 64,
                      fontFamily: "Raleway",
                      background: "linear-gradient(135deg, #ffa449, #ffa449)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {averageRating}
                  </Title>
                  <Text style={{ fontSize: 24, color: "#ffa449" }}>/5</Text>
                </div>
                <Rate
                  disabled
                  allowHalf
                  value={parseFloat(averageRating)}
                  style={{ fontSize: 28 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#64748b",
                    fontFamily: "Raleway",
                  }}
                >
                  Based on {reviews.length} reviews
                </Text>
              </div>
            </Col>

            <Col xs={24} md={16}>
              <Space direction="vertical" size={8} style={{ width: "100%" }}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div
                    key={star}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Text
                      style={{
                        minWidth: 60,
                        fontFamily: "Raleway",
                        color: "#475569",
                      }}
                    >
                      {star}{" "}
                      <StarFilled style={{ color: "#fbbf24", fontSize: 14 }} />
                    </Text>
                    <div
                      style={{
                        flex: 1,
                        height: 10,
                        background: "#e2e8f0",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${
                            (ratingDistribution[star] / reviews.length) * 100
                          }%`,
                          height: "100%",
                          background:
                            "linear-gradient(90deg, #ffa449, #ffa449)",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                    <Text
                      style={{
                        minWidth: 40,
                        fontFamily: "Raleway",
                        color: "#333",
                        textAlign: "right",
                      }}
                    >
                      {ratingDistribution[star]}
                    </Text>
                  </div>
                ))}
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Filters */}
        <div
          style={{
            background: "#fff",
            padding: isMobile ? 16 : 24,
            borderRadius: 16,
            marginBottom: 24,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 16,
            alignItems: isMobile ? "stretch" : "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            <div style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>
              <Text
                strong
                style={{
                  fontFamily: "Raleway",
                  marginRight: 8,
                  color: "#475569",
                }}
              >
                Filter:
              </Text>
              <Select
                value={selectedRating}
                onChange={setSelectedRating}
                style={{ width: isMobile ? "100%" : 150 }}
                options={[
                  { label: "All ratings", value: "all" },
                  { label: "5 stars", value: 5 },
                  { label: "4 stars", value: 4 },
                  { label: "3 stars", value: 3 },
                  { label: "2 stars", value: 2 },
                  { label: "1 star", value: 1 },
                ]}
              />
            </div>
            <div style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>
              <Text
                strong
                style={{
                  fontFamily: "Raleway",
                  marginRight: 8,
                  color: "#475569",
                }}
              >
                Sort by:
              </Text>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: isMobile ? "100%" : 150 }}
                options={[
                  { label: "Latest", value: "latest" },
                  { label: "Oldest", value: "oldest" },
                  { label: "Highest rated", value: "highest" },
                  { label: "Lowest rated", value: "lowest" },
                ]}
              />
            </div>
          </div>
          {hasUserReviewed ? (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              iconPosition="end"
              style={{
                background: "linear-gradient(135deg, #ffa449, #ffa449)",
                border: "none",
                borderRadius: 10,
                fontFamily: "Raleway",
                fontWeight: 600,
                height: 40,
                boxShadow: "0 4px 12px rgba(189, 184, 144, 0.3)",
              }}
            >
              Reviewed
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                if (userLoggedIn) {
                  toggleReview();
                } else {
                  setOpenAuthModal(true);
                }
              }}
              style={{
                background: "linear-gradient(135deg, #ffa449, #ffa449)",
                border: "none",
                borderRadius: 10,
                fontFamily: "Raleway",
                fontWeight: 600,
                height: 40,
                boxShadow: "0 4px 12px rgba(189, 184, 144, 0.3)",
              }}
            >
              Write a Review
            </Button>
          )}
        </div>

        {/* Reviews List */}
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          {productDataLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} style={{ borderRadius: 16 }}>
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </Card>
              ))
          ) : reviews.length === 0 ? (
            <Card
              style={{
                borderRadius: 16,
                textAlign: "center",
                padding: 40,
                background: "#fff",
              }}
            >
              <StarOutlined
                style={{
                  fontSize: 64,
                  color: "#cbd5e1",
                  marginBottom: 16,
                }}
              />
              <Title
                level={4}
                style={{ fontFamily: "Raleway", color: "#64748b" }}
              >
                No reviews yet
              </Title>
              <Text style={{ fontFamily: "Raleway", color: "#94a3b8" }}>
                Be the first to share your experience
              </Text>
            </Card>
          ) : (
            reviews.map((review, idx) => (
              <Card
                key={idx}
                style={{
                  borderRadius: 16,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  background: "#fff",
                }}
                bodyStyle={{ padding: isMobile ? 20 : 28 }}
                hoverable
              >
                {/* Review Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 16,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <Avatar
                      size={isMobile ? 48 : 56}
                      style={{
                        background: "#ffa449",
                        fontSize: 24,
                        fontWeight: 600,
                      }}
                    >
                      {review.name[0]}
                    </Avatar>
                    <div>
                      <Text
                        strong
                        style={{
                          fontFamily: "Raleway",
                          fontSize: 18,
                          display: "block",
                          color: "#1e293b",
                        }}
                      >
                        {review.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Raleway",
                          fontSize: 14,
                          color: "#94a3b8",
                        }}
                      >
                        {formatDistanceToNowStrict(new Date(review.createdAt))}{" "}
                        ago
                      </Text>
                    </div>
                  </div>
                  <Rate
                    disabled
                    allowHalf
                    value={review.rating}
                    style={{ fontSize: isMobile ? 16 : 18 }}
                  />
                </div>

                {/* Review Content */}
                <div>
                  <Title
                    level={4}
                    style={{
                      fontFamily: "Raleway",
                      marginBottom: 8,
                      color: "#334155",
                    }}
                  >
                    {review.title}
                  </Title>
                  <Paragraph
                    style={{
                      fontFamily: "Raleway",
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: "#64748b",
                      marginBottom: 0,
                    }}
                  >
                    {review.review}
                  </Paragraph>

                  {review.email === currentUser?.email && (
                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        gap: 10,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Tooltip title="Edit your review">
                        <Button
                          onClick={() => editReview(review._id)}
                          icon={<EditOutlined />}
                          type="primary"
                          shape="circle"
                        />
                      </Tooltip>
                      <Tooltip title="Delete your review">
                        <Popconfirm
                          title="Delete review?"
                          description="This action cannot be undone."
                          open={open}
                          onConfirm={() => {
                            setConfirmLoading(true);
                            deleteReview(review._id).finally(() => {
                              setOpen(false);
                              setConfirmLoading(false);
                            });
                          }}
                          okButtonProps={{ loading: confirmLoading }}
                          onCancel={() => setOpen(false)}
                        >
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={() => setOpen(true)}
                            danger
                            type="primary"
                            shape="circle"
                          />
                        </Popconfirm>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </Space>
      </div>

      <EditReview
        content={editContent}
        openEditReview={openEditReview}
        toggleEditReview={toggleEditReview}
        isMobile={isMobile}
        //productRefresh={productRefresh}
      />
    </>
  );
}

export default ReviewsDetails;
