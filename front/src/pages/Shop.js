import React, { useMemo, useState } from "react";
import { Button, Col, Image, Row, Skeleton, Typography } from "antd";
import { useUser } from "../context/UserContext";
import "../assets/css/shop.css";
import ItemCard from "../components/ItemCard";
import emptyImg from "../assets/images/Empty.png";
import useFetchAllProducts from "../hooks/fetchAllProducts";
import { BannerDiv, selectableItems } from "../utils/ShopPageFunctions";

const { Title, Text } = Typography;

function Shop() {
  const { isMobile } = useUser();
  const [selectedTab, setSelectedTab] = useState("");
  const { products, productsLoading, handleLoadMore } = useFetchAllProducts();

  const filteredProducts = useMemo(() => {
    if (selectedTab === "") return products;
    return products.filter((p) => p.category === selectedTab);
  }, [selectedTab, products]);

  const visibleProducts = selectedTab === "" ? products : filteredProducts;

  const memoizedProducts = useMemo(() => {
    return visibleProducts;
  }, [visibleProducts]);

  const tabSelector = (name) => {
    setSelectedTab(name);
  };

  return (
    <div>
      {/* banner */}

      <div style={{ position: "relative", marginBottom: 10 }}>
        <BannerDiv isMobile={isMobile} />
      </div>

      {/* selectableItems */}
      <div
        style={{
          margin: isMobile ? "20px 32px" : "40px 64px",
          padding: isMobile ? 12 : 28,
        }}
      >
        <div
          className="scroll-container"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: isMobile ? 20 : 40,
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            paddingBottom: isMobile ? 20 : 40,
          }}
        >
          {selectableItems.map((s) => (
            <div
              style={{
                position: "relative",
                cursor: "pointer",
                maxHeight: isMobile ? 150 : 200,
                maxWidth: 200,
                transition: "all 0.25s ease-in-out",
                // border:
                //   selectedTab === s.title
                //     ? "4px solid #fea549"
                //     : "2px solid transparent",
                // boxShadow:
                //   selectedTab === s.title
                //     ? "0 4px 12px rgba(0,0,0,0.55)"
                //     : "none",
              }}
              key={s.key}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() => tabSelector(s.title)}
            >
              <img
                src={s.img}
                alt="img"
                style={{
                  width: isMobile ? "150px" : "200px",
                  height: isMobile ? "150px" : "200px",
                  objectFit: "cover",
                  marginBottom: 20,
                  borderRadius: 20,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.13)",
                  color: "#fff",
                  borderRadius: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? 20 : 24,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textAlign: "center",
                    margin: 0,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                  }}
                >
                  {s.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexDirection: isMobile ? "column" : "column",
          margin: isMobile ? "10px 15px" : "20px 0",
        }}
      >
        {/* Center title */}
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Title
            level={isMobile ? 4 : 2}
            style={{
              margin: 0,
              textAlign: "center",
              fontFamily: "DM Sans",
            }}
          >
            {selectedTab === "" ? "All Products" : selectedTab}
          </Title>
        </div>

        {/* Left button (on mobile, aligned left) */}
        {selectedTab !== "" && (
          <div
            style={{
              margin: isMobile ? "0" : "0 34px",
              padding: isMobile ? "0" : "0 16px",
              position: isMobile ? "" : "absolute",
              left: isMobile ? "auto" : 0,
            }}
          >
            <Button
              type="primary"
              style={{
                fontFamily: "DM Sans",
                fontSize: isMobile ? 13 : 16,
                height: isMobile ? 35 : 40,
              }}
              onClick={() => setSelectedTab("")}
            >
              All Products
            </Button>
          </div>
        )}
      </div>

      {/* products */}
      <div>
        {productsLoading ? (
          <div style={{ margin: "0px 10px", padding: "10px 15px" }}>
            <Row gutter={[32, 32]}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Col key={i} xs={24} sm={12} md={8}>
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div>
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: 40,
                  display: "flex",
                  gap: 10,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  type="secondary"
                  style={{ fontFamily: "DM Sans", fontSize: 18 }}
                >
                  Sorry, no products found in this category.
                </Text>
                <Image
                  src={emptyImg}
                  alt="empty_img"
                  preview={false}
                  width={350}
                  height={350}
                  loading="lazy"
                  style={{
                    margin: "0 auto",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              <div style={{ margin: "0px 10px", padding: "10px 15px" }}>
                <div style={{ marginTop: 10 }}>
                  <Row gutter={[32, 32]}>
                    {memoizedProducts.map((c) => {
                      return (
                        <Col key={c._id} xs={24} sm={12} md={6}>
                          <ItemCard dataSource={c} />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        style={{
          margin: "0 auto",
          padding: "10px 15px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          onClick={handleLoadMore}
          loading={productsLoading}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

export default Shop;
