import { useState } from "react";
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
  InputNumber,
  Tag,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import chair1 from "../assets/icons/office-chair1.png";
import { useNotification } from "../context/NotificationContext";
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons";
import GetLocation from "../components/GetLocation";
import { CartFunctions } from "../utils/CartFunctions";
import axios from "axios";

const { Title, Text } = Typography;

function Checkout() {
  const navigate = useNavigate();
  const { liveCartItems } = useCart();
  const { isMobile } = useUser();
  const openNotification = useNotification();
  const { useMyLocation, addressDetails, geoLoading, selectedLocation } =
    GetLocation();
  const { updateCart, removeFromCart } = CartFunctions();
  const [loading, setLoading] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    //address: "",
    //details: "",
    email: "",
  });

  const subtotal = liveCartItems.reduce(
    (total, item) =>
      total +
      (item.discount > 0
        ? ((100 - item.discount) * item.price) / 100
        : item.price) *
        (item.quantity || 1),
    0
  );
  const shippingFee = deliveryOption === "delivery" ? 500 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      if (deliveryOption === "delivery") {
        const missingFields = Object.entries(formData)
          .filter(([key, value]) => !value)
          .map(([key]) => key);

        if (missingFields.length > 0) {
          openNotification(
            "warning",
            `Please fill in the following fields: ${missingFields.join(", ")}.`,
            "Error!"
          );
          return;
        }
      }
      openNotification(
        "success",
        "Proceeding to payment. Please wait...",
        "Success!"
      );

      const paymentDetails = {
        //amount: total,
        amount: 1, //temp for testing
        phone_number: formData.phone,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
      };

      const res = await axios.post("initiate-payment", paymentDetails);
      const { redirectUrl, orderTrackingId } = res.data;

      const checkoutData = {
        order: liveCartItems,
        customer_info: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          address: addressDetails.formattedAddress,
          city: addressDetails.city,
          coordinates: { lat: selectedLocation.lat, lng: selectedLocation.lng },
          email: formData.email,
          additional_info: formData.details,
        },
        payment_method: paymentMethod,
        subtotal: subtotal,
        total: total,
        items: liveCartItems.length,
        delivery_option: deliveryOption,
        shipping_fee: shippingFee,
        date: new Date().toISOString(),
        orderTrackingId: orderTrackingId,
      };

      //console.log("checkout Data:", checkoutData);

      const response = await axios.post(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/create-order`,
        checkoutData
      );
      if (response.data.success) {
        window.location.href = redirectUrl;
      }

      setFormData({});
    } catch (error) {
      console.error(error);
      openNotification(
        "error",
        "An error occurred while processing your checkout. Kindly try again or call us directly.",
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
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
            dataSource={liveCartItems}
            renderItem={(item) => (
              <List.Item
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  padding: "10px 0",
                }}
                actions={[
                  <Space.Compact>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => updateCart(item, value)}
                      style={{ width: isMobile ? 70 : 115 }}
                      suffix={item.quantity > 1 ? "Items" : "Item"}
                    />
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(item._id)}
                    />
                  </Space.Compact>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      src={item.img[0]}
                      alt={item.name}
                      width={isMobile ? 70 : 85}
                      height={isMobile ? 70 : 85}
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
                        fontSize: isMobile ? 16 : 22,
                        marginBottom: 0,
                        fontFamily: "DM Sans",
                      }}
                    >
                      {item.name}
                    </Text>
                  }
                  description={
                    <>
                      {isMobile ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Text
                            strong
                            style={{
                              fontSize: isMobile ? 12 : 16,
                              marginBottom: 0,
                            }}
                          >
                            KES.{" "}
                            {item.discount > 0
                              ? (
                                  ((100 - item.discount) * item.price) /
                                  100
                                ).toLocaleString()
                              : item.price.toLocaleString()}{" "}
                            x {item.quantity} = KES.{" "}
                            {(item.discount > 0
                              ? ((100 - item.discount) * item.price) / 100
                              : item.price * item.quantity
                            ).toLocaleString()}{" "}
                            {item.discount > 0 ? (
                              <Tag color="#ffa34a">{item.discount}% off</Tag>
                            ) : null}
                          </Text>
                          <p
                            style={{
                              color: "red",
                              fontSize: isMobile ? 8 : 12,
                              marginTop: 0,
                            }}
                          >
                            TYPE: {item.type.toUpperCase()}
                          </p>
                        </div>
                      ) : (
                        <Text
                          strong
                          style={{ fontSize: isMobile ? 12 : 16, marginTop: 0 }}
                        >
                          KES.{" "}
                          {item.discount > 0
                            ? (
                                ((100 - item.discount) * item.price) /
                                100
                              ).toLocaleString()
                            : item.price.toLocaleString()}{" "}
                          x {item.quantity} = KES.{" "}
                          {(item.discount > 0
                            ? ((100 - item.discount) * item.price) / 100
                            : item.price * item.quantity
                          ).toLocaleString()}{" "}
                          {item.discount > 0 ? (
                            <Tag color="#ffa34a">{item.discount}% off</Tag>
                          ) : null}
                          <p
                            style={{
                              color: "red",
                              fontSize: isMobile ? 8 : 12,
                              marginTop: 0,
                            }}
                          >
                            TYPE: {item.type.toUpperCase()}
                          </p>
                        </Text>
                      )}
                    </>
                  }
                />
                {!isMobile && (
                  <div>
                    <Text
                      strong
                      style={{
                        fontSize: isMobile ? 10 : 14,
                        fontFamily: "DM Sans",
                      }}
                    >
                      {item.discount > 0 ? (
                        <Tag color="#ffa34a">{item.discount}% off</Tag>
                      ) : null}{" "}
                      KES.{" "}
                      {item.discount > 0
                        ? (
                            ((100 - item.discount) * item.price) /
                            100
                          ).toLocaleString()
                        : item.price.toLocaleString()}{" "}
                      x {item.quantity} = KES.{" "}
                      {(item.discount > 0
                        ? ((100 - item.discount) * item.price) / 100
                        : item.price * item.quantity
                      ).toLocaleString()}
                    </Text>
                  </div>
                )}
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
                  <p style={{ margin: 0 }}>
                    We'll use these details to contact you
                  </p>
                  <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Input
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name: e.target.value,
                          })
                        }
                        style={{ fontFamily: "DM Sans", height: 40 }}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Input
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name: e.target.value,
                          })
                        }
                        style={{ fontFamily: "DM Sans", height: 40 }}
                      />
                    </Col>
                  </Row>

                  <Row gutter={[24, 24]}>
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
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Input
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        style={{ fontFamily: "DM Sans", height: 40 }}
                      />
                    </Col>
                  </Row>

                  <Space.Compact>
                    <Input
                      placeholder="Delivery Address (Click the button)"
                      disabled
                      value={addressDetails.formattedAddress}
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

                  {/* <Space.Compact>
                    <Input
                      placeholder="Lat"
                      disabled
                      value={formData.lat || selectedLocation.lat}
                      onChange={(e) =>
                        setFormData({ ...formData, lat: e.target.value })
                      }
                      style={{ fontFamily: "DM Sans", height: 40 }}
                    />
                    <Input
                      placeholder="Lng"
                      disabled
                      value={formData.lng || selectedLocation.lng}
                      onChange={(e) =>
                        setFormData({ ...formData, lng: e.target.value })
                      }
                      style={{ fontFamily: "DM Sans", height: 40 }}
                    />
                  </Space.Compact> */}

                  {/* <Input
                    placeholder="City / Town"
                    value={formData.city || addressDetails.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    style={{ fontFamily: "DM Sans", height: 40 }}
                  /> */}

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
                <div style={{ marginTop: 0, lineHeight: 1.8 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      We'll use these details to contact you
                    </p>
                    <Row gutter={[24, 24]}>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Input
                          placeholder="First Name"
                          value={formData.first_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              first_name: e.target.value,
                            })
                          }
                          style={{ fontFamily: "DM Sans", height: 40 }}
                        />
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Input
                          placeholder="Last Name"
                          value={formData.last_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              last_name: e.target.value,
                            })
                          }
                          style={{ fontFamily: "DM Sans", height: 40 }}
                        />
                      </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
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
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Input
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          style={{ fontFamily: "DM Sans", height: 40 }}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div style={{ marginTop: 10 }}>
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
                {/* <Radio value="paypal" style={{ fontFamily: "DM Sans" }}>
                  PayPal
                </Radio> */}
                <Radio value="onDelivery" style={{ fontFamily: "DM Sans" }}>
                  Cash on Delivery
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
            loading={loading}
            onClick={handleCheckout}
            style={{
              backgroundColor: "#fea549",
              border: "none",
              fontFamily: "DM Sans",
            }}
          >
            {loading ? "Please wait..." : "Proceed to Payment"}
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
