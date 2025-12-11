import { ShoppingCartOutlined } from "@ant-design/icons";
import { Col, Row, Skeleton, Empty, Typography } from "antd";
import ItemCard from "./ItemCard";

const { Title, Text } = Typography;

function MyCart({ cartData }) {
  const productsLoading = false;


  if (productsLoading) {
    return (
      <Row gutter={[32, 32]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Col key={i} xs={24} sm={12} md={8}>
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </Col>
        ))}
      </Row>
    );
  }
  return (
    <div>
      <div style={{ marginBottom: 24, padding: "0 20px" }}>
        <Title level={2} style={{ fontFamily: "Raleway", marginBottom: 8 }}>
          <span>My Cart</span>
          <ShoppingCartOutlined style={{ color: "green", marginLeft: 8 }} />
        </Title>
        <Text style={{ color: "#64748b", fontSize: 15 }}>
          View all the products saved in your cart
        </Text>
      </div>

      <div style={{ background: "whitesmoke" }}>
        <div style={{ margin: "16px" }}>
          {cartData?.length === 0 ? (
            <Empty description="Seems like your wishlist is empty. Like some products to save them for future reference" />
          ) : (
            <div style={{ marginTop: 10 }}>
              <Row gutter={[32, 32]}>
                {cartData.map((c) => (
                  <Col key={c._id} xs={24} sm={12} md={6}>
                    <ItemCard dataSource={c} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCart;
