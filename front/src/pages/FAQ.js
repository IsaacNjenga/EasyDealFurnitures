import React from "react";
import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import { useUser } from "../context/UserContext";
const { Title, Text, Paragraph } = Typography;

const bannerImg =
  "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg";

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
function FAQ() {
  const { isMobile } = useUser();
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
          <Title style={{ fontFamily: "DM Sans", color: "#fff" }}>FAQ's</Title>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
