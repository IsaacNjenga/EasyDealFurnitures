import React, { useState } from "react";
import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import { useUser } from "../context/UserContext";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const bannerImg =
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg";

const heroStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: "#fff",
  padding: "10px 20px",
};

const contactInfo = [
  {
    key: 1,
    icon: EnvironmentOutlined,
    title: "Location",
    content: "Ngara rd, Nairobi, Kenya",
    content2: "O. Rongai",
  },
  {
    key: 2,
    icon: PhoneOutlined,
    title: "Call Us",
    content: "+254 720 731-982",
    content2: "+254 722 528-672",
  },
  {
    key: 3,
    icon: ClockCircleOutlined,
    title: "Working Hours",
    content: "Mon-Sat: 8:00 a.m - 6:00 p.m",
    content2: "Holidays: 9:00 a.m - 5:00 p.m",
  },
];

function Contact() {
  const { isMobile } = useUser();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (error) {
      console.error("Error sending email", error);
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <div>
      {/* banner */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Image
          src={bannerImg}
          alt="bgImg"
          width="100%"
          height={isMobile ? 350 : 500}
          preview={false}
          style={{
            objectFit: isMobile ? "contain" : "cover",
            maxWidth: "100%",
          }}
        />
        <div style={heroStyle}>
          <Title style={{ fontFamily: "DM Sans", color: "#fff" }}>
            Contact
          </Title>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          width: "65%",
          margin: "20px auto",
          background: "#e9eaee",
        }}
      >
        <Row gutter={[16, 16]}>
          {contactInfo.map((c) => (
            <Col
              key={c.key}
              xs={16}
              md={6}
              style={{
                margin: "10px auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <div>
                    {
                      <c.icon
                        style={{
                          fontSize: "4rem",
                          margin: 10,
                          color: "#fba747",
                        }}
                      />
                    }
                  </div>
                  <Text style={{ fontFamily: "DM Sans", fontSize: 22 }}>
                    {c.title}
                  </Text>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontFamily: "DM Sans", fontSize: 15 }}>
                    {c.content}
                  </Text>
                  <Text style={{ fontFamily: "DM Sans", fontSize: 15 }}>
                    {c.content2}
                  </Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div
          style={{
            margin: "20px 0",
            background: "#3a3d46",
            padding: 20,
          }}
        >
          <Title style={{ fontFamily: "DM Sans", color: "white" }}>
            SEND AN EMAIL
          </Title>
          <Paragraph
            style={{
              fontFamily: "DM Sans",
              width: "80%",
              textAlign: "center",
              margin: "0px auto",
              color: "white",
              fontSize: 18,
            }}
          >
            Thank you for showing interest in our products. We believe in
            customer satisfaction as one of our mission. Please use this form if
            you have any questions about our products and we'll get back with
            you as soon as possible.
          </Paragraph>

          <div style={{ margin: 20, padding: 20 }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Form.Item name="name" rules={[{ required: true }]}>
                    <Input
                      style={{ borderRadius: 0, color: "#444", height: 50 }}
                      placeholder="Your name"
                    />
                  </Form.Item>{" "}
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email_address"
                    rules={[{ required: true }]}
                    extra={
                      <span style={{ color: "white", fontFamily: "DM Sans" }}>
                        We'll use this email to get back to you
                      </span>
                    }
                  >
                    <Input
                      style={{ borderRadius: 0, color: "#444", height: 50 }}
                      placeholder="Your email"
                      type="email"
                    />
                  </Form.Item>{" "}
                </Col>
              </Row>
              <Form.Item name="subject" rules={[{ required: true }]}>
                <Input
                  style={{ borderRadius: 0, color: "#444", height: 50 }}
                  placeholder="Subject"
                />
              </Form.Item>{" "}
              <Form.Item name="message" rules={[{ required: true }]}>
                <Input.TextArea
                  style={{ borderRadius: 0, color: "#444" }}
                  placeholder="Your message"
                  rows={6}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  background: "transparent",
                  border: "1px solid white",
                  color: "white",
                  padding: "20px 24px",
                  borderRadius: 0,
                  marginTop: 20,
                  fontSize: 16,
                }}
              >
                {loading ? "" : "Send message"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
