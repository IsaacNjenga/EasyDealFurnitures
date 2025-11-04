import { Card, Tag, Typography, Divider, Row, Col, Space } from "antd";
import { motion } from "framer-motion";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const { Text, Title } = Typography;

const TransactionStatusCard = ({ transactionStatusData }) => {
  if (!transactionStatusData) return null;

  const {
    merchant_reference,
    order_tracking_id,
    payment_method,
    payment_status_description,
    amount,
    currency,
    payment_account,
    created_date,
    message,
    status_code,
    confirmation_code,
  } = transactionStatusData;

  const isSuccess =
    payment_status_description?.toLowerCase() === "completed" ||
    status_code === 1;

  const statusColor = isSuccess ? "green" : "red";
  const statusIcon = isSuccess ? (
    <CheckCircleFilled style={{ color: "green", fontSize: 28 }} />
  ) : (
    <CloseCircleFilled style={{ color: "red", fontSize: 28 }} />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 500,
          margin: "20px auto",
          borderRadius: 16,
          boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
          background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Title
              level={4}
              style={{ margin: 0, fontFamily: "DM Sans", fontWeight: 600 }}
            >
              Payment Summary
            </Title>
          </Col>
          <Col>{statusIcon}</Col>
        </Row>

        <Divider />

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Row justify="space-between">
            <Col>
              <Text type="secondary">Status</Text>
            </Col>
            <Col>
              <Tag
                style={{
                  fontSize: 14,
                  padding: "4px 10px",
                  borderRadius: 8,
                  color: "white",
                  background: statusColor,
                }}
              >
                {payment_status_description}
              </Tag>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>
              <Text type="secondary">Payment Method</Text>
            </Col>
            <Col>
              <Text strong>{payment_method}</Text>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>
              <Text type="secondary">Account</Text>
            </Col>
            <Col>
              <Text>{payment_account}</Text>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>
              <Text type="secondary">Confirmation Code</Text>
            </Col>
            <Col>
              <Text>{confirmation_code}</Text>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>
              <Text type="secondary">Amount</Text>
            </Col>
            <Col>
              <Tag strong color="green">
                {currency} {amount?.toLocaleString()}
              </Tag>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>
              <Text type="secondary">Order Reference</Text>
            </Col>
            <Col>
              <Text>{merchant_reference}</Text>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>
              <Text type="secondary">Tracking ID</Text>
            </Col>
            <Col>
              <Text>{order_tracking_id}</Text>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>
              <Text type="secondary">Date</Text>
            </Col>
            <Col>
              <Text>
                {new Date(created_date).toLocaleString("en-KE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Text>
            </Col>
          </Row>
        </Space>

        <Divider />

        <Text type="secondary" style={{ fontStyle: "italic" }}>
          {message}
        </Text>
      </Card>
    </motion.div>
  );
};

export default TransactionStatusCard;


