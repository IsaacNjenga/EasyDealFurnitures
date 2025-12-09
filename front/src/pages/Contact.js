import { useState } from "react";
import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import { useUser } from "../context/UserContext";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNotification } from "../context/NotificationContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CustomMarker } from "../components/CustomMarker";
import GetLocation from "../components/GetLocation";
import "leaflet-routing-machine";
import { Routing } from "../components/Routing";
import axios from "axios";

const { BaseLayer } = LayersControl;

const { Title, Text, Paragraph } = Typography;

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
    content: "Ngara Road, Nairobi, Kenya",
    content2: "Opp. Ngara Post Office",
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

const OurLocation = () => {
  const { selectedLocation, useMyLocationRoute, geoLoading } = GetLocation();

  const userLat = selectedLocation.lat;
  const userLng = selectedLocation.lng;

  // const userLat = -1.2142139; ? for testing
  // const userLng = 36.8661946;

  const storeLat = -1.276502;
  const storeLng = 36.826517;

  return (
    <div style={{ marginTop: 0 }}>
      <Title style={{ fontFamily: "DM Sans" }}>Our Location</Title>
      <Button
        type="primary"
        icon={<EnvironmentOutlined />}
        style={{ height: 40, fontFamily: "DM Sans", marginBottom: 10 }}
        onClick={useMyLocationRoute}
        loading={geoLoading}
      >
        Get route
      </Button>
      <div style={{ marginBottom: 10 }}>
        {userLat && userLng && (
          <Text style={{ fontFamily: "DM Sans" }}>
            Note: Your location may not be 100% accurate.
          </Text>
        )}
      </div>

      <MapContainer
        center={[storeLat, storeLng]}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Street View">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="Satellite">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>

          <BaseLayer name="Terrain">
            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="Dark Mode">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </BaseLayer>
        </LayersControl>
        <Marker position={[storeLat, storeLng]} icon={CustomMarker}>
          <Popup>Your current location</Popup>
        </Marker>

        {userLat && userLng && (
          <Routing
            userLat={userLat}
            userLng={userLng}
            storeLat={storeLat}
            storeLng={storeLng}
          />
        )}
      </MapContainer>
    </div>
  );
};

function Contact() {
  const { isMobile } = useUser();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      //console.log(values);

      const res = await axios.post(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/create-mail`,
        values
      );
      if (res.data.success) {
        openNotification(
          "success",
          "Email sent successfully. We'll get back to you!",
          "Success!"
        );
      }
    } catch (error) {
      console.error("Error sending email", error);
      openNotification(
        "error",
        "Email could not be sent. Kindly try again or call us directly.",
        "There was something wrong!"
      );
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
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
          alt="bgImg"
          width="100%"
          loading="lazy"
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
          width: isMobile ? "90%" : "65%",
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
              width: isMobile ? "100%" : "80%",
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

          <div
            style={{ margin: isMobile ? 14 : 20, padding: isMobile ? 14 : 20 }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="full_name"
                    rules={[{ required: true, message: "A name is required" }]}
                  >
                    <Input
                      style={{ borderRadius: 0, color: "#444", height: 50 }}
                      placeholder="Your name"
                    />
                  </Form.Item>{" "}
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email_address"
                    rules={[
                      {
                        required: true,
                        message: "An email address is required",
                      },
                    ]}
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
              <Form.Item
                name="subject"
                rules={[
                  { required: true, message: "An email subject is required" },
                ]}
              >
                <Input
                  style={{ borderRadius: 0, color: "#444", height: 50 }}
                  placeholder="Subject"
                />
              </Form.Item>{" "}
              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "A message body is required" },
                ]}
              >
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
        <div style={{ margin: 0, padding: 0 }}>
          <OurLocation />
        </div>
      </div>
    </div>
  );
}

export default Contact;
