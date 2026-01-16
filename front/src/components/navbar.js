import {
  Menu,
  Button,
  Layout,
  Typography,
  Drawer,
  Tooltip,
  Badge,
  Avatar,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import FooterComponent from "./footer";
import { useUser } from "../context/UserContext";
import {
  CloseOutlined,
  DownOutlined,
  MenuOutlined,
  MessageOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../assets/css/navbar.css";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { useChat } from "../context/ChatContext";
import SearchModal from "./SearchModal";
import CustomerChat from "./CustomerChat";

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
  { key: 2, label: "SHOP", path: "/shop" },
  // {
  //   key: 2,
  //   label: "SHOP",
  //   path: "/shop",
  //   children: [
  //     { key: "2-1", label: "All Products", path: "/shop" },
  //     { key: "2-2", label: "On Sale", path: "/shop/sale" },
  //     { key: "2-3", label: "New Arrivals", path: "/shop/new" },
  //   ],
  // },
  { key: 3, label: "CONTACT", path: "/contact" },
  { key: 4, label: "FAQ's", path: "/faq" },
  { key: 5, label: "MY WISHLIST", path: "/wishlist" },
];

function Navbar() {
  const navigate = useNavigate();
  const { isMobile, scrolled, toggleDrawer, drawerOpen } = useUser();
  const { userLoggedIn, currentUser, openAuthModal, setOpenAuthModal } =
    useAuth();
  const { cartItems, cartOpen, toggleCart } = useCart();
  const { openChat, toggleChatDrawer, streamLoading } = useChat();
  const { setSearchOpen } = useSearch();

  const handleAuth = () => {
    setOpenAuthModal(true);
  };

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    width: "100%",
    padding: "0 50px",
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
              gap: isMobile ? 0 : 20,
            }}
          >
            {/* logo and title */}
            <div
              style={{
                display: "flex",
                gap: isMobile ? 5 : 10,
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
                  src="https://res.cloudinary.com/dinsdfwod/image/upload/v1765199954/office-chair1_xlt5fs.png"
                  alt="logo"
                  style={{
                    width: scrolled ? 50 : isMobile ? 60 : 150,
                    height: scrolled ? 50 : isMobile ? 60 : 150,
                    borderRadius: "50%",
                    objectFit: "cover",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    marginTop: 5,
                    marginBottom: 0,
                    marginRight: isMobile ? 3 : 5,
                    boxShadow: "0 4px 16px rgba(254, 165, 73, 0.4)",
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
            {/* menu and burger */}
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
                    marginLeft: -15,
                    gap: 10,
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      <SearchOutlined
                        style={{ color: "#ecdedeff", fontSize: 20 }}
                      />
                    }
                    onClick={() => setSearchOpen(true)}
                  />{" "}
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
                  theme="light"
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
                          fontSize: scrolled ? 16 : 20,
                          fontWeight: 400,
                          color: "#fff",
                          letterSpacing: scrolled ? 1 : 1.3,
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
            {/* account and cart */}
            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  {userLoggedIn && currentUser ? (
                    <>
                      <Tooltip
                        title={
                          currentUser?.displayName ||
                          currentUser?.email ||
                          "User"
                        }
                      >
                        {currentUser?.photoURL ? (
                          <Avatar
                            src={currentUser?.photoURL}
                            size="50"
                            onClick={() => {
                              navigate("/user");
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <Avatar
                            size="50"
                            onClick={() => {
                              navigate("/user");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {/* Safe access with fallback */}
                            {currentUser?.displayName?.[0] ||
                              currentUser?.email?.[0]?.toUpperCase() ||
                              "U"}
                          </Avatar>
                        )}
                      </Tooltip>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      onClick={handleAuth}
                      style={{
                        fontFamily: "Raleway",
                        fontSize: 18,
                        fontWeight: 300,
                        color: "#ffffff",
                        letterSpacing: 1.5,
                        background: "#fea349bc",
                        border: "none",
                        boxShadow: "0 4px 16px rgba(189, 184, 144, 0.3)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(189, 184, 144, 0.4)";
                        e.currentTarget.style.backgroundColor = "#fea549";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 16px rgba(189, 184, 144, 0.3)";
                        e.currentTarget.style.backgroundColor = "#fea349bc";
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                </div>
                <Tooltip title="Search...">
                  <SearchOutlined
                    style={iconStyle}
                    onClick={() => setSearchOpen(true)}
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
            <Menu.Item>
              <div>
                <Text
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontFamily: "DM Sans",
                    textShadow: " 2px 2px 2px rgba(0, 0, 0, 0.3)",
                  }}
                  onClick={() => navigate("/user")}
                >
                  MY ACCOUNT
                </Text>
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

        {/* chat drawer */}
        {/* <Drawer
          placement="right"
          width={isMobile ? 600 : 400}
          onClose={toggleChatDrawer}
          open={openChat}
          style={{ backgroundColor: "#ffa44a", margin: 0, padding: 0 }}
          closeIcon={
            <CloseOutlined
              style={{
                color: "#333",
              }}
            />
          }
        >
          <CustomerChat />
        </Drawer>
         */}
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
      <AuthModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        isMobile={isMobile}
      />
      <SearchModal />
      {openChat && <CustomerChat />}

      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "auto",
          height: "auto",
          maxHeight: "calc(100vh - 100px)",
          backgroundColor: "#fff",
          borderRadius: "50%",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
          display: openChat ? "none" : "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Tooltip title="Chat with us">
          <Button
            shape="circle"
            size="large"
            loading={streamLoading}
            type="primary"
            icon={<MessageOutlined style={{ fontSize: 20 }} />}
            onClick={toggleChatDrawer}
            style={{
              backgroundColor: "#fea549",
              color: "#fff",
            }}
          />
        </Tooltip>
      </div>
    </>
  );
}

export default Navbar;
