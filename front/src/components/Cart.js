import React from "react";
import { useCart } from "../context/CartContext";
import {
  Avatar,
  List,
  InputNumber,
  Button,
  Typography,
  Divider,
  Empty,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons"; // adjust path if needed
import { CartFunctions } from "./CartFunctions";

const { Text, Title } = Typography;

function Cart() {
  const { cartItems } = useCart();
  const { updateCart, removeFromCart } = CartFunctions();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Empty description="Your cart is empty" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key="remove"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeFromCart(item._id)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={80}
                  src={item.img?.[0]}
                  alt={item.type}
                />
              }
              title={<Text strong>{item.name}</Text>}
              description={
                <>
                  <Text type="secondary">
                    Ksh {item.price.toLocaleString()}
                  </Text>
                  <div style={{ marginTop: 8 }}>
                    <Text style={{ marginRight: 8 }}>Qty:</Text>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(val) => updateCart(item, val)}
                      style={{ width: 70 }}
                    />
                  </div>
                </>
              }
            />

            <div style={{ textAlign: "right" }}>
              <Text strong>
                Subtotal: Ksh {(item.price * item.quantity).toLocaleString()}
              </Text>
            </div>
          </List.Item>
        )}
      />

      <Divider />

      <div className="flex justify-between items-center mt-4">
        <Title level={5}>Total:</Title>
        <Title level={5} style={{ color: "#1677ff" }}>
          Ksh {total.toLocaleString()}
        </Title>
      </div>

      <Button type="primary" block size="large" style={{ marginTop: 16 }}>
        Proceed to Checkout
      </Button>
    </div>
  );
}

export default Cart;
