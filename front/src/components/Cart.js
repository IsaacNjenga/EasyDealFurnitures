import React from "react";
import { useCart } from "../context/CartContext";
import {
  List,
  InputNumber,
  Button,
  Typography,
  Divider,
  Empty,
  Image,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CartFunctions } from "../utils/CartFunctions";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

function Cart() {
  const navigate = useNavigate();
  const { isMobile } = useUser();
  const { cartItems } = useCart();
  const { updateCart, removeFromCart } = CartFunctions();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div>
        <Empty description="Your cart is empty" />
      </div>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            style={{ flexWrap: "wrap" }}
            actions={[
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => updateCart(item, value)}
                style={{ width: isMobile ? 95 : 115 }}
                suffix={item.quantity > 1 ? "Items" : "Item"}
              />,
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeFromCart(item._id)}
              />,
            ]}
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
                  style={{ fontSize: isMobile ? 18 : 22, marginBottom: 0 }}
                >
                  {item.name}
                </Text>
              }
              description={
                <Text
                  strong
                  style={{ fontSize: isMobile ? 12 : 16, marginTop: 0 }}
                >
                  KES. {item.price.toLocaleString()} x {item.quantity} = KES.
                  {(item.price * item.quantity).toLocaleString()}
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
              }
            />
          </List.Item>
        )}
      />

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Title level={5}>Total:</Title>
        <Title level={5} style={{ color: "#1677ff" }}>
          Ksh {total.toLocaleString()}
        </Title>
      </div>

      <Button
        type="primary"
        block
        size="large"
        style={{ marginTop: 16 }}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

export default Cart;
