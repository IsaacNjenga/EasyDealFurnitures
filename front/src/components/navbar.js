import React from "react";
import { Menu, Button, Layout, Typography, Drawer, Tooltip, Badge } from "antd";
import { Link, Outlet } from "react-router-dom";
import FooterComponent from "./footer";
//import chair from "../assets/icons/office-chair.png";
import chair1 from "../assets/icons/office-chair1.png";
import { useUser } from "../context/UserContext";
import {
  CloseOutlined,
  DownOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../assets/css/navbar.css";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const iconStyle = {
  fontSize: 32,
  transition: "all 0.3s ease",
  cursor: "pointer",
  color: "#fff",
};

const menuItems = [
  { key: 1, label: "HOME", path: "/" },
  {
    key: 2,
    label: "SHOP",
    path: "/shop",
    children: [
      { key: "2-1", label: "All Products", path: "/shop" },
      { key: "2-2", label: "On Sale", path: "/shop/sale" },
      { key: "2-3", label: "New Arrivals", path: "/shop/new" },
    ],
  },
  { key: 3, label: "CONTACT", path: "/contact" },
  { key: 4, label: "FAQ's", path: "/faq" },
  { key: 5, label: "MY WISHLIST", path: "/wishlist" },
];

function Navbar() {
  const { isMobile, scrolled, toggleDrawer, drawerOpen } = useUser();
  const { cartItems, cartOpen, toggleCart } = useCart();

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    width: "100%",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    transition: "all 0.4s ease",
    transform: "translateY(0)",
    background: scrolled ? "rgba(9, 12, 17, 0.26)" : "rgba(9, 12, 17, 0)",
    backdropFilter: scrolled ? "blur(2px)" : "blur(0px)",
    boxShadow: scrolled
      ? "0 2px 12px rgba(28, 27, 27, 0.4)"
      : "0 0 0 rgba(0,0,0,0)",
    height: "auto",
  };
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={headerStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={chair1}
                  alt="logo"
                  style={{
                    width: scrolled ? 55 : isMobile ? 65 : 150,
                    height: scrolled ? 55 : isMobile ? 65 : 150,
                    borderRadius: "50%",
                    //border: "2px solid #3d63d3ff",
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
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <Title
                  level={scrolled ? 5 : isMobile ? 4 : 1}
                  style={{
                    width: "50%",
                    transition: "all 0.3s ease",
                    fontFamily: "Bebas Neue",
                    letterSpacing: isMobile ? 2.8 : 3.5,
                    color: "#fff",
                  }}
                >
                  EasyDeal Furnitures
                </Title>
              </Link>
            </div>
            <div
              style={{
                width: isMobile ? 0 : "60%",
              }}
            >
              {isMobile ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      <MenuOutlined
                        style={{ color: "#ecdedeff", fontSize: 20 }}
                      />
                    }
                    onClick={toggleDrawer}
                  />
                </div>
              ) : (
                <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    background: "transparent",
                    borderBottom: "none",
                  }}
                  items={menuItems.map(({ key, label, path, children }) => ({
                    key,
                    label: (
                      <Link
                        to={path}
                        style={{
                          fontSize: 20,
                          fontWeight: 300,
                          color: "#fff",
                          letterSpacing: 1.3,
                          fontFamily: "DM Sans",
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        {label}{" "}
                        {children && (
                          <DownOutlined
                            style={{ fontSize: 12, marginLeft: 5 }}
                          />
                        )}
                      </Link>
                    ),
                    children: children
                      ? children.map((child) => ({
                          key: child.key,
                          label: (
                            <Link
                              to={child.path}
                              style={{
                                fontSize: 16,
                                fontFamily: "DM Sans",
                                color: "#333",
                              }}
                            >
                              {child.label}
                            </Link>
                          ),
                        }))
                      : undefined,
                  }))}
                />
              )}
            </div>
            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  gap: 25,
                }}
              >
                <Tooltip title="Search...">
                  <SearchOutlined
                    style={iconStyle}
                    onClick={toggleDrawer}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Tooltip>
                <Tooltip title="My Cart">
                  <Badge
                    //dot={cartItems.length > 0 ? true : false}
                    overflowCount={10}
                    count={cartItems.length}
                    offset={[2, 2]} 
                    style={{
                      backgroundColor: "#fea549",
                      color: "#fff",
                      fontFamily: "DM Sans",
                    }}
                  >
                    <ShoppingCartOutlined
                      style={iconStyle}
                      onClick={toggleCart}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </Badge>
                </Tooltip>               
              </div>
            )}
          </div>
        </Header>
        {/* menu drawer */}
        <Drawer
          placement="right"
          width={isMobile ? 300 : 500}
          onClose={toggleDrawer}
          open={drawerOpen}
          style={{ backgroundColor: "#ffa44a" }}
          closeIcon={
            <CloseOutlined
              style={{
                color: "#333",
              }}
            />
          }
        >
          <Menu
            mode="vertical"
            style={{
              background: "rgb(0,0,0,0)",
              borderColor: "rgb(0,0,0,0)",
              fontFamily: "DM Sans",
              fontWeight: "bold",
            }}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontFamily: "DM Sans",
                    textShadow: " 2px 2px 2px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item>
              <div>
                <Badge dot={cartItems.length > 0 ? true : false}>
                  <Text
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontFamily: "DM Sans",
                      textShadow: " 2px 2px 2px rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={toggleCart}
                  >
                    MY CART
                  </Text>
                </Badge>
              </div>
            </Menu.Item>
          </Menu>
        </Drawer>

        {/* cart drawer */}
        <Drawer
          title={
            <Title
              style={{
                fontFamily: "DM Sans",
                fontSize: isMobile ? 22 : 28,
                color: "#444",
                letterSpacing: 1,
                fontWeight: 600,
              }}
            >
              My Cart
            </Title>
          }
          placement="right"
          width={720}
          onClose={toggleCart}
          open={cartOpen}
          style={{ backgroundColor: "whitesmoke" }}
          closeIcon={
            <CloseOutlined
              style={{
                color: "#333",
              }}
            />
          }
        >
          <Cart />
        </Drawer>
        <Content
          style={{
            margin: 0,
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <FooterComponent />
        </Footer>
      </Layout>
    </>
  );
}

export default Navbar;
