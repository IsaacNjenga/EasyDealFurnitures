import React from "react";
import { Menu, Button, Layout, Typography, Drawer } from "antd";
import { Link, Outlet } from "react-router-dom";
import FooterComponent from "./footer";
//import chair from "../assets/icons/office-chair.png";
import chair1 from "../assets/icons/office-chair1.png";
import { useUser } from "../context/UserContext";
import {
  CloseOutlined,
  DownOutlined,
  HeartOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../assets/css/navbar.css";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const iconStyle = {
  fontSize: 32,
  transition: "all 0.3s ease",
  cursor: "pointer",
  color: "#fff",
};

const menuItems = [
  { key: 1, label: "Home", path: "/" },
  {
    key: 2,
    label: "Shop",
    path: "/shop",
    children: [
      { key: "2-1", label: "Products", path: "/shop/products" },
      { key: "2-2", label: "On Sale", path: "/shop/sale" },
      { key: "2-3", label: "New Arrivals", path: "/shop/new" },
    ],
  },
];

function Navbar() {
  const { isMobile, scrolled, toggleDrawer, drawerOpen } = useUser();

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
                <ShoppingCartOutlined
                  style={iconStyle}
                  onClick={toggleDrawer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <HeartOutlined
                  style={iconStyle}
                  onClick={toggleDrawer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            )}
          </div>
        </Header>
        <Drawer
          placement="right"
          width={isMobile ? 300 : 500}
          onClose={toggleDrawer}
          open={drawerOpen}
          style={{ backgroundColor: "#eae4ace8" }}
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
                    color: "#333",
                    textDecoration: "none",
                    fontFamily: "DM Sans",
                  }}
                >
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
            {/* <Menu.Item>
              <div
                style={{
                  display: "flex",
                  gap: 25,
                }}
              >
                <SearchOutlined style={iconStyle} onClick={toggleDrawer} />
                <ShoppingCartOutlined
                  style={iconStyle}
                  onClick={toggleDrawer}
                />
                <HeartOutlined style={iconStyle} onClick={toggleDrawer} />
              </div>
            </Menu.Item> */}
          </Menu>
        </Drawer>
        <Content
          style={{
            margin: 0,
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
        <Footer>
          <FooterComponent />
        </Footer>
      </Layout>
    </>
  );
}

export default Navbar;
