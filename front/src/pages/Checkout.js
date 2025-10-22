import React, { useState } from "react";
import {
  Button,
  Input,
  Radio,
  Divider,
  List,
  Typography,
  Card,
  Row,
  Col,
  Image,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import chair1 from "../assets/icons/office-chair1.png";
import { useNotification } from "../context/NotificationContext";
import { EnvironmentOutlined } from "@ant-design/icons";
import GetLocation from "../components/GetLocation";

const { Title, Text } = Typography;

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isMobile } = useUser();
  const openNotification = useNotification();
  const { useMyLocation, addressDetails, geoLoading } = GetLocation();
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    details: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shippingFee = deliveryOption === "delivery" ? 500 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (deliveryOption === "delivery") {
      if (
        !formData.full_name ||
        !formData.phone ||
        !formData.address ||
        !formData.city ||
        !formData.details
      ) {
        openNotification(
          "warning",
          "Please fill in all delivery details.",
          "Error!"
        );
        return;
      }
    }
    openNotification("success", "Proceeding to payment...", "Success!");
    const checkoutData = {
      ...formData,
      deliveryOption: deliveryOption,
      paymentMethod: paymentMethod,
      items: cartItems,
    };
    console.log(checkoutData);
    setFormData({});
    // TO:DO integrate payment API call here
  };

  return (
    <div
      style={{
        background: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignContent: "center",
          alignItems: "center",
          margin: "0 20px",
        }}
      >
        <img
          src={chair1}
          alt="logo"
          style={{
            width: isMobile ? 75 : 150,
            height: isMobile ? 75 : 150,
            borderRadius: "50%",
            objectFit: "cover",
            transition: "all 0.3s ease",
            cursor: "pointer",
            marginTop: 5,
            marginBottom: 0,
            marginRight: 5,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <Title
          level={isMobile ? 4 : 1}
          style={{
            width: isMobile ? "40%" : "20%",
            transition: "all 0.3s ease",
            fontFamily: "Bebas Neue",
            letterSpacing: isMobile ? 2.8 : 3.5,
            color: "#fff",
            textShadow: "1px 1px 1px rgba(0, 0, 0, 0.35)",
          }}
        >
          EasyDeal Furnitures
        </Title>
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          padding: 20,
          fontFamily: "DM Sans",
          background: "#fafafa",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 40,
            fontFamily: "DM Sans",
          }}
        >
          Checkout
        </Title>

        {/* CART SUMMARY */}
        <Card
          style={{
            marginBottom: 40,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontFamily: "DM Sans",
            height: "auto",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Your Items
          </Title>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  padding: "10px 0",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      src={item.img[0]}
                      alt={item.name}
                      width={isMobile ? 75 : 85}
                      height={isMobile ? 75 : 85}
                      style={{
                        borderRadius: 8,
                        objectFit: "cover",
                        maxWidth: "100%",
                      }}
                    />
                  }
                  title={
                    <Text
                      strong
                      style={{
                        fontSize: isMobile ? 16 : 20,
                        marginBottom: 0,
                        fontFamily: "DM Sans",
                      }}
                    >
                      {item.name}
                    </Text>
                  }
                  description={
                    <Text
                      type="secondary"
                      style={{
                        fontSize: isMobile ? 8 : 12,
                        marginTop: 0,
                        fontFamily: "DM Sans",
                      }}
                    >
                      TYPE: {item.type.toUpperCase()}
                    </Text>
                  }
                />
                <div>
                  <Text
                    strong
                    style={{
                      fontSize: isMobile ? 10 : 14,
                      fontFamily: "DM Sans",
                    }}
                  >
                    KES. {item.price.toLocaleString()} x {item.quantity} = KES.
                    {(item.price * item.quantity).toLocaleString()}
                  </Text>
                </div>
              </List.Item>
            )}
          />
        </Card>

        <Row gutter={[5, 24]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            {/* DELIVERY / PICKUP OPTIONS */}
            <Card
              style={{
                marginBottom: 40,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                height: "auto",
                fontFamily: "DM Sans",
              }}
            >
              <Title level={4} style={{ margin: 0, fontFamily: "DM Sans" }}>
                Delivery or Pickup
              </Title>
              <Divider />
              <Radio.Group
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value)}
                style={{ marginBottom: 20, fontFamily: "DM Sans" }}
              >
                <Radio value="delivery" style={{ fontFamily: "DM Sans" }}>
                  Deliver to my location
                </Radio>
                <Radio value="pickup" style={{ fontFamily: "DM Sans" }}>
                  Pick up from store
                </Radio>
              </Radio.Group>

              {deliveryOption === "delivery" ? (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Input
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            full_name: e.target.value,
                          })
                        }
                        style={{ fontFamily: "DM Sans", height: 40 }}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Input
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        style={{ fontFamily: "DM Sans", height: 40 }}
                      />
                    </Col>
                  </Row>

                  <Space.Compact>
                    <Input
                      placeholder="Delivery Address"
                      value={
                        formData.address || addressDetails.formattedAddress
                      }
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      style={{ fontFamily: "DM Sans", height: 40 }}
                    />
                    <Button
                      type="primary"
                      icon={<EnvironmentOutlined />}
                      style={{ height: 40, fontFamily: "DM Sans" }}
                      onClick={useMyLocation}
                      loading={geoLoading}
                    >
                      Use my location
                    </Button>
                  </Space.Compact>

                  <Input
                    placeholder="City / Town"
                    value={formData.city || addressDetails.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    style={{ fontFamily: "DM Sans", height: 40 }}
                  />
                  <Input.TextArea
                    placeholder="Additional Details"
                    value={formData.details}
                    rows={5}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    style={{ fontFamily: "DM Sans" }}
                  />
                </div>
              ) : (
                <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                  <strong>Pickup Location:</strong>
                  <p style={{ margin: 0, fontFamily: "DM Sans" }}>
                    EasyDeal Furniture
                  </p>
                  <p style={{ margin: 0, fontFamily: "DM Sans" }}>
                    Ngara Rd., Nairobi, Kenya
                  </p>
                  <p style={{ margin: 0, fontFamily: "DM Sans" }}>
                    Mon–Sat: 8:00 AM – 6:00 PM
                  </p>
                  <p style={{ margin: 0, fontFamily: "DM Sans" }}>
                    Call: +254 720 731-982
                  </p>
                </div>
              )}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            {/* PAYMENT METHOD */}
            <Card
              style={{
                marginBottom: 40,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                height: "auto",
              }}
            >
              <Title level={4} style={{ margin: 0, fontFamily: "DM Sans" }}>
                Payment Method
              </Title>
              <Divider />
              <Radio.Group
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Radio value="mpesa" style={{ fontFamily: "DM Sans" }}>
                  M-Pesa
                </Radio>
                <Radio value="paypal" style={{ fontFamily: "DM Sans" }}>
                  PayPal
                </Radio>
                <Radio value="onDelivery" style={{ fontFamily: "DM Sans" }}>
                  Pay on Delivery
                </Radio>
              </Radio.Group>
            </Card>
          </Col>
        </Row>

        {/* ORDER SUMMARY */}
        <Card
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            height: "auto",
          }}
        >
          <Title level={4} style={{ margin: 0, fontFamily: "DM Sans" }}>
            Order Summary
          </Title>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text>Subtotal:</Text>
            <Text>KES {subtotal.toLocaleString()}</Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: "DM Sans" }}>Shipping:</Text>
            <Text style={{ fontFamily: "DM Sans" }}>
              {shippingFee > 0 ? `KES ${shippingFee.toLocaleString()}` : "Free"}
            </Text>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text strong style={{ fontFamily: "DM Sans" }}>
              Total:
            </Text>
            <Text strong style={{ fontSize: 18, fontFamily: "DM Sans" }}>
              KES {total.toLocaleString()}
            </Text>
          </div>

          <Button
            type="primary"
            block
            size="large"
            onClick={handleCheckout}
            style={{
              backgroundColor: "#fea549",
              border: "none",
              fontFamily: "DM Sans",
            }}
          >
            Proceed to Payment
          </Button>
          <Button
            block
            size="large"
            onClick={() => navigate("/shop")}
            style={{
              marginTop: 10,
              borderColor: "#fea549",
              color: "#fea549",
              fontFamily: "DM Sans",
            }}
          >
            Back to Store
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Checkout;
