import { Button, Divider, Form, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import chair1 from "../assets/icons/office-chair1.png";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import {
  FacebookFilled,
  InstagramOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useNotification } from "../context/NotificationContext";

const { Title, Text } = Typography;

const icons = [
  {
    icon: WhatsAppOutlined,
    link: "https://www.whatsapp.com/",
  },
  { icon: InstagramOutlined, link: "https://www.instagram.com/" },
  { icon: FacebookFilled, link: "https://www.facebook.com/" },
];
function FooterComponent() {
  const { isMobile } = useUser();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();

  const handleEmailSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log(values);
      openNotification(
        "success",
        "Thank you for subscribing to our newsletter.",
        "Success!"
      );
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
    <div style={{ background: "#000000", padding: isMobile ? 20 : 40 }}>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-evenly",
          marginBottom: 40,
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={chair1}
              alt="logo"
              style={{
                width: isMobile ? 120 : 150,
                height: isMobile ? 120 : 150,
                borderRadius: "50%",
                objectFit: "cover",
                transition: "all 0.1s ease-in-out",
                cursor: "pointer",
                margin: "0 auto",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
            <Title
              level={isMobile ? 2 : 1}
              style={{
                width: "50%",
                transition: "all 0.3s ease",
                fontFamily: "Bebas Neue",
                letterSpacing: isMobile ? 2.8 : 3.5,
                color: "#fff",
                margin: "0 10px",
              }}
            >
              EasyDeal Furnitures
            </Title>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Title
            style={{
              letterSpacing: 2.5,
              color: "#fea549",
              marginBottom: 0,
              fontFamily: "Bebas Neue",
            }}
          >
            VISIT OUR SHOWROOM
          </Title>
          <Text
            style={{
              letterSpacing: 1.5,
              color: "#fff",
              marginTop: 0,
              marginBottom: 0,
              fontFamily: "DM Sans",
            }}
          >
            Ngara Rd., Nairobi, Kenya
          </Text>
          <Text
            style={{
              letterSpacing: 1.5,
              color: "#fff",
              marginBottom: 0,
              marginTop: 0,
              fontFamily: "DM Sans",
            }}
          >
            Mon - Sat: 8:00am - 6:00pm
          </Text>
        </div>
      </div>

      <Divider style={{ borderColor: "#444" }} />

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          gap: 10,
          padding: 10,
        }}
      >
        <div style={{ padding: 20, flex: 1 }}>
          <Text
            style={{
              fontFamily: "DM Sans",
              marginBottom: 10,
              letterSpacing: 1,
              color: "#fff",
            }}
          >
            Sign up here for updates and promotional offers
          </Text>
          <Form
            style={{ width: "100%", display: "flex", marginTop: 10 }}
            onFinish={handleEmailSubmit}
            form={form}
            layout={"vertical"}
            requiredMark={false}
          >
            <Form.Item
              name="email_address"
              rules={[
                { required: true, message: "An email address is required" },
              ]}
            >
              <Space.Compact>
                <Input
                  style={{
                    borderRadius: 0,
                    width: isMobile ? "100%" : "500px",
                    color: "#444",
                  }}
                  placeholder="Your email address"
                  type="email"
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{
                    borderRadius: 0,
                    color: "#fff",
                    background: "transparent",
                    border: "1px solid #fff",
                  }}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </Space.Compact>
            </Form.Item>
          </Form>

          <div>
            <Title
              style={{
                margin: 0,
                fontFamily: "DM Sans",
                color: "#fff",
                textAlign: isMobile ? "center" : "left",
              }}
              level={3}
            >
              Follow us
            </Title>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                justifyContent: isMobile ? "center" : "left",
                marginTop: 0,
              }}
            >
              {icons.map((item) => (
                <div key={item.link}>
                  <a href={item.link} rel="noreferrer" target="_blank">
                    {
                      <item.icon
                        style={{
                          fontSize: 30,
                          borderRadius: "50%",
                          background: "#fea549",
                          padding: 8,
                          color: "#fff",
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    }
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <div>
            <Text
              style={{
                fontFamily: "DM Sans",
                marginBottom: 10,
                letterSpacing: 1,
                color: "#fff",
              }}
            >
              Reach out to us in case of any issue, assistance or questions:
            </Text>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "5px auto",
                fontFamily: "DM Sans",
              }}
            >
              <li>
                <Text style={{ color: "#fff", fontFamily: "DM Sans" }}>
                  +254 722 528-672
                </Text>
              </li>
              <li>
                <Text style={{ color: "#fff", fontFamily: "DM Sans" }}>
                  +254 720 731-982
                </Text>
              </li>
              <li>
                <Text style={{ color: "#fff", fontFamily: "DM Sans" }}>
                  +254 714 738-997
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
