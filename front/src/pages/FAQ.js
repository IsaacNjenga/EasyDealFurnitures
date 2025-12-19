import React from "react";
import { Collapse, Image, Typography } from "antd";
import { useUser } from "../context/UserContext";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Panel } = Collapse;

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

const faqData = [
  {
    question: "Do you offer custom furniture designs?",
    answer:
      "Yes, we specialize in made-to-order furniture. Share your design idea or inspiration with us, and our team will help bring it to life using high-quality materials and expert craftsmanship.",
  },
  {
    question: "What is your delivery timeline?",
    answer:
      "For ready-made items, delivery usually takes 3–5 business days. Custom orders may take between 2–4 weeks, depending on the complexity and availability of materials.",
  },
  {
    question: "Can I see the furniture in person before buying?",
    answer:
      "Absolutely! You can visit our showroom to explore our furniture collections and material samples. Contact us to schedule a visit or get directions to the nearest location.",
  },
  {
    question: "Do you provide assembly services?",
    answer:
      "Yes, all large furniture items come with free professional assembly. Our delivery team will handle setup and placement for you, ensuring everything is installed perfectly.",
  },
  {
    question: "What is your return or exchange policy?",
    answer:
      "We offer a 7-day return window for items in their original condition. Custom-made furniture, however, cannot be returned once production has started. Please contact support for assistance.",
  },
  {
    question: "What materials do you use in your furniture?",
    answer:
      "We source sustainably harvested wood, premium fabrics, and durable metal components. Each product listing specifies the materials used so you can make an informed choice.",
  },
];
function FAQ() {
  const { isMobile } = useUser();
  return (
    <div>
      {/* banner */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Image
          src="https://plus.unsplash.com/premium_photo-1661963965541-adda6e4c6a1e?w=900"
          loading="lazy"
          alt="bgImg"
          width="100%"
          height={isMobile ? 350 : 600}
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

      <div
        style={{
          maxWidth: "100%",
          margin: "20px auto",
          padding: 20,
          backgroundColor: "#fafafa",
        }}
      >
        <Title
          style={{
            fontFamily: "DM Sans",
            textAlign: "center",
            fontWeight: 600,
            color: "#333",
          }}
        >
          Frequently Asked Questions
        </Title>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Text
            type="secondary"
            style={{
              fontFamily: "DM Sans",
              textAlign: "center",
              width: "50%",
              fontSize: 18,
              color: "#555",
            }}
          >
            Need help or have any questions? Contact us at{" "}
            <a
              href="mailto:support@easydeal.com"
              style={{ color: "#fea549", textDecoration: "none" }}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              support@easydeal.com
            </a>
          </Text>
        </div>

        <Collapse
          accordion
          expandIcon={({ isActive }) => (
            <PlusOutlined
              rotate={isActive ? 45 : 0}
              style={{ fontSize: 18, color: "#5a5a5a" }}
            />
          )}
          style={{
            width: "100%",
            marginTop: 20,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
            border: "1px solid #f0f0f0",
            overflow: "hidden",
          }}
        >
          {faqData.map((item, i) => (
            <Panel
              header={
                <Text
                  strong
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: 20,
                    color: "#444",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.question}
                </Text>
              }
              key={i}
              style={{
                background: "#fff",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9f9f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  color: "#666",
                  fontSize: 16,
                  lineHeight: 1.7,
                  display: "block",
                  marginTop: 5,
                }}
              >
                {item.answer}
              </Text>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}

export default FAQ;
