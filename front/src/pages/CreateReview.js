import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Rate,
  Card,
  Typography,
  Space,
  Drawer,
} from "antd";
import {
  CloseOutlined,
  StarFilled,
  EditOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNotification } from "../context/NotificationContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

function CreateReview({ content, openReview, toggleReview, isMobile }) {
  const [form] = Form.useForm();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const { currentUser } = useAuth();

  const handleSubmit = async () => {
    if (value === 0) {
      openNotification(
        "error",
        "Please assign a star rating",
        "Almost there..."
      );
      return;
    }
    setLoading(true);
    try {
      const values = await form.validateFields();
      const allValues = {
        ...values,
        rating: value,
        productId: content?._id,
        name: currentUser?.displayName,
        email: currentUser?.email,
      };

      const res = await axios.post(
        "https://easy-deal-admin-server.vercel.app/EasyAdmin/create-review",
        allValues
      );
      if (res.data.success) {
        openNotification(
          "success",
          "Your feedback is highly appreciated",
          "Thank you!"
        );

        // Close drawer after successful submission
        setTimeout(() => {
          toggleReview();
          form.resetFields();
          setValue(0);
        }, 2500);
      }
    } catch (error) {
      console.error(error);
      openNotification(
        "error",
        "Try again or contact us.",
        "Something went wrong..."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={openReview}
      onClose={toggleReview}
      width={isMobile ? "100%" : 700}
      placement="right"
      closeIcon={null}
      styles={{
        header: {
          background: "linear-gradient(135deg, #bdb890, #a8a378)",
          border: "none",
          padding: 0,
        },
        body: {
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          padding: 0,
        },
      }}
    >
      {/* Custom Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #bdb890, #a8a378)",
          padding: isMobile ? "24px 20px" : "32px 32px 24px",
          position: "relative",
        }}
      >
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={toggleReview}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#fff",
            fontSize: 20,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.2)",
            borderRadius: "50%",
            zIndex: 10,
          }}
        />

        <div style={{ paddingRight: 40 }}>
          <Title
            level={3}
            style={{
              color: "#fff",
              margin: 0,
              marginBottom: 8,
              fontFamily: "Raleway",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Write a Review
          </Title>
          <Text
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 15,
              fontFamily: "Raleway",
            }}
          >
            Share your experience with this product
          </Text>
        </div>
      </div>

      {/* Property Info Card */}
      <div style={{ padding: isMobile ? 16 : 24 }}>
        <Card
          style={{
            borderRadius: 16,
            marginBottom: 24,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            background: "#fff",
          }}
          styles={{body:{padding: isMobile ? 16 : 20}}}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #bdb890, #a8a378)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StarFilled style={{ fontSize: 24, color: "#fff" }} />
            </div>
            <div style={{ flex: 1 }}>
              <Text
                strong
                style={{
                  fontSize: 16,
                  fontFamily: "Raleway",
                  color: "#1e293b",
                  display: "block",
                }}
              >
                {content?.type || "Product"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Raleway",
                  color: "#64748b",
                }}
              >
                {content?.name || "N/A"}
              </Text>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
          style={{
            background: "#fff",
            padding: isMobile ? 20 : 32,
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Rating */}
          <Form.Item
            label={
              <Text
                strong
                style={{
                  fontSize: 16,
                  fontFamily: "Raleway",
                  color: "#1e293b",
                }}
              >
                How would you rate this product?
              </Text>
            }
            name="rating"
            rules={[{ required: false, message: "Please provide a rating" }]}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                padding: 24,
                borderRadius: 12,
                textAlign: "center",
                border: "2px dashed #cbd5e1",
                transition: "all 0.3s ease",
              }}
            >
              <Rate
                allowHalf
                value={value}
                tooltips={desc}
                onChange={setValue}
                style={{
                  fontSize: isMobile ? 36 : 48,
                  marginBottom: 12,
                }}
              />
              {value > 0 && (
                <Text
                  style={{
                    display: "block",
                    fontSize: 18,
                    fontFamily: "Raleway",
                    color: "#bdb890",
                    fontWeight: 600,
                    marginTop: 8,
                  }}
                >
                  {desc[value - 1]}
                </Text>
              )}
            </div>
          </Form.Item>

          {/* Title */}
          <Form.Item
            label={
              <Space>
                <EditOutlined style={{ color: "#bdb890" }} />
                <Text
                  strong
                  style={{
                    fontSize: 15,
                    fontFamily: "Raleway",
                    color: "#1e293b",
                  }}
                >
                  Give it a title
                </Text>
              </Space>
            }
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input
              size="large"
              style={{
                borderRadius: 10,
                fontFamily: "Raleway",
                border: "2px solid #e2e8f0",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#bdb890")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </Form.Item>

          {/* Review */}
          <Form.Item
            label={
              <Space>
                <MessageOutlined style={{ color: "#bdb890" }} />
                <Text
                  strong
                  style={{
                    fontSize: 15,
                    fontFamily: "Raleway",
                    color: "#1e293b",
                  }}
                >
                  Your Review
                </Text>
              </Space>
            }
            name="review"
            rules={[
              {
                required: true,
                message: "Please write your review",
                min: 10,
              },
            ]}
          >
            <Input.TextArea
              placeholder="Share your experience with this product... What did you or did you not like? What could be improved?"
              rows={6}
              style={{
                borderRadius: 10,
                fontFamily: "Raleway",
                border: "2px solid #e2e8f0",
                fontSize: 15,
                resize: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#bdb890")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              showCount
              maxLength={500}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
                style={{
                  background: "linear-gradient(135deg, #bdb890, #a8a378)",
                  border: "none",
                  borderRadius: 12,
                  height: 50,
                  fontFamily: "Raleway",
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: "0 4px 16px rgba(189, 184, 144, 0.4)",
                }}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
              <Button
                size="large"
                block
                onClick={toggleReview}
                style={{
                  borderRadius: 12,
                  height: 50,
                  fontFamily: "Raleway",
                  fontWeight: 600,
                  fontSize: 16,
                  border: "2px solid #e2e8f0",
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
}

export default CreateReview;
