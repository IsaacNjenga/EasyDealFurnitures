import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Typography,
  Avatar,
  Space,
  Tag,
  Row,
  Col,
  Statistic,
  Button,
  Popconfirm,
  Spin,
  Result,
} from "antd";
import {
  MailOutlined,
  TrophyOutlined,
  HeartFilled,
  StarFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import MyFavourites from "../components/MyFavourites";
import MyReviews from "../components/MyReviews";
import MyCart from "../components/MyCart";
import AuthModal from "../components/AuthModal";
import useFetchClient from "../hooks/fetchClient";
import { format } from "date-fns";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MyHistory from "../components/MyHistory";

const { Title, Text } = Typography;

const titleStyle = {
  fontFamily: "Raleway",
  fontSize: 16,
  fontWeight: 400,
  color: "#3a3d44ff",
};

const tabListNoTitle = [
  {
    key: "favourites",
    label: (
      <Space>
        <span style={titleStyle}>My Favourites</span>
      </Space>
    ),
  },
  {
    key: "reviews",
    label: (
      <Space>
        <span style={titleStyle}>My Reviews</span>
      </Space>
    ),
  },
  {
    key: "cart",
    label: (
      <Space>
        <span style={titleStyle}>My Cart</span>
      </Space>
    ),
  },
  {
    key: "history",
    label: (
      <Space>
        <span style={titleStyle}>My History</span>
      </Space>
    ),
  },
];

function User() {
  const { isMobile } = useUser();
  const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = useState("favourites");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    client,
    clientFavourites,
    clientReviews,
    clientCart,
    clientLoading,
    clientError,
    fetchClient,
    resetClient,
    refreshKey,
    //eslint-disable-next-line
    clientRefresh,
  } = useFetchClient();

  const { userLoggedIn, openAuthModal, setOpenAuthModal, currentUser, logout } =
    useAuth();

  // Effect to handle authentication and fetching
  useEffect(() => {
    if (!userLoggedIn || !currentUser) {
      setOpenAuthModal(true);
      resetClient(); // Clear any existing client data
      return;
    }

    const email = currentUser?.email;
    if (email && !client) {
      // Only fetch if we don't have client data yet
      fetchClient(email);
    }
  }, [
    currentUser,
    userLoggedIn,
    client,
    fetchClient,
    resetClient,
    setOpenAuthModal,
    refreshKey,
  ]);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleLogout = async () => {
    setConfirmLoading(true);
    try {
      await logout();
      //resetClient();
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  // Show auth modal if not logged in
  if (!userLoggedIn || !currentUser) {
    return (
      <AuthModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        isMobile={isMobile}
      />
    );
  }

  // Show loading state
  if (clientLoading) {
    return <Spin size="large" fullscreen tip="Loading your profile..." />;
  }

  // Show error state
  if (clientError && !client) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Result
          status="error"
          title="Failed to Load Profile"
          subTitle={clientError}
          extra={
            <Button
              type="primary"
              onClick={() => fetchClient(currentUser?.email)}
            >
              Try Again
            </Button>
          }
        />
      </div>
    );
  }

  const user = {
    avatar: client?.avatar,
    name:
      client?.name ||
      currentUser?.displayName ||
      currentUser?.email?.split("@")[0] ||
      "User",
    email: client?.email || currentUser?.email,
    memberSince: client?.createdAt
      ? format(new Date(client.createdAt), "MMMM yyyy")
      : format(new Date(), "MMMM yyyy"),
    stats: {
      favourites: clientFavourites?.length || 0,
      reviews: clientReviews?.length || 0,
      cart: clientCart?.length || 0,
    },
  };

  const contentListNoTitle = {
    favourites: <MyFavourites favouritesData={clientFavourites} />,
    reviews: <MyReviews reviewsData={clientReviews} />,
    cart: <MyCart cartData={clientCart} />,
    history: <MyHistory />,
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
          minHeight: "100vh",
          paddingBottom: 40,
        }}
      >
        {/* banner */}
        <div
          style={{
            position: "relative",
            height: isMobile ? 450 : 500,
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1595846723416-99a641e1231a?w=900"
            alt="Hero Background"
            loading="lazy"
            width="100%"
            height="100%"
            preview={false}
            style={{
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />

          {/* Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(173, 149, 76, 0.37) 0%, rgba(207, 210, 110, 0.34) 100%)",
            }}
          />

          {/* Decorative Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.1,
            }}
          >
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="heroPattern"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="30" cy="30" r="3" fill="white" />
                  <circle cx="0" cy="0" r="3" fill="white" />
                  <circle cx="60" cy="60" r="3" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroPattern)" />
            </svg>
          </div>

          {/* Content */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: isMobile ? "10px" : "30px",
              color: "#fff",
            }}
          >
            {currentUser?.photoURL ? (
              <Avatar src={currentUser.photoURL} size={isMobile ? 90 : 100} />
            ) : (
              <Avatar size={isMobile ? 90 : 100}>
                {user.name?.[0]?.toUpperCase() || "U"}
              </Avatar>
            )}

            <Title
              level={1}
              style={{
                color: "#fff",
                fontFamily: "Raleway",
                fontWeight: 600,
                fontSize: isMobile ? 32 : 48,
                margin: 0,
                marginBottom: 6,
                textShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              {user.name}
            </Title>

            <Space
              direction={isMobile ? "vertical" : "horizontal"}
              size={isMobile ? 8 : 16}
              style={{ marginBottom: 8 }}
            >
              <Space>
                <MailOutlined style={{ fontSize: 16 }} />
                <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: 15 }}>
                  {user.email}
                </Text>
              </Space>
            </Space>

            <Tag
              icon={<TrophyOutlined />}
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 20,
                padding: "6px 16px",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Member since {user.memberSince}
            </Tag>
          </div>

          {/* Stats Card - Floating */}
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? 10 : 5,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? "90%" : "auto",
              zIndex: 20,
            }}
          >
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                border: "none",
                background: "white",
              }}
              styles={{
                body: { padding: isMobile ? "20px 16px" : "16px 36px" },
              }}
            >
              <Row gutter={[32, 16]} style={{ textAlign: "center" }}>
                <Col xs={8} sm={8}>
                  <Statistic
                    title={
                      <Space>
                        <HeartFilled style={{ color: "#ff4d4f" }} />
                        <span>Favourites</span>
                      </Space>
                    }
                    value={user.stats.favourites}
                    valueStyle={{
                      color: "#667eea",
                      fontSize: isMobile ? 24 : 32,
                      fontWeight: 600,
                    }}
                  />
                </Col>
                <Col xs={8} sm={8}>
                  <Statistic
                    title={
                      <Space>
                        <StarFilled style={{ color: "gold" }} />
                        <span>Reviews</span>
                      </Space>
                    }
                    value={user.stats.reviews}
                    valueStyle={{
                      color: "#667eea",
                      fontSize: isMobile ? 24 : 32,
                      fontWeight: 600,
                    }}
                  />
                </Col>
                <Col xs={8} sm={8}>
                  <Statistic
                    title={
                      <Space>
                        <ShoppingCartOutlined style={{ color: "#52c41a" }} />
                        <span>Cart</span>
                      </Space>
                    }
                    value={user.stats.cart}
                    valueStyle={{
                      color: "#667eea",
                      fontSize: isMobile ? 24 : 32,
                      fontWeight: 600,
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? "60px 16px 40px" : "40px 18px 40px",
          }}
        >
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "1px 8px 24px rgba(0,0,0,0.12)",
              border: "none",
              background: "whitesmoke",
            }}
            styles={{
              body: { padding: 0 },
            }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
            tabProps={{
              size: "large",
              tabBarStyle: {
                padding: "0 24px",
                marginBottom: 0,
              },
            }}
          >
            <div style={{ padding: isMobile ? "24px 16px" : "16px 12px" }}>
              {contentListNoTitle[activeTabKey]}
            </div>
          </Card>

          {/* Help Section */}
          <Card
            style={{
              marginTop: 24,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
              border: "1px solid #e8e8f5",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
            styles={{
              body: { padding: isMobile ? 20 : 24 },
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                💬
              </div>
              <div style={{ flex: 1 }}>
                <Text
                  strong
                  style={{ fontSize: 16, display: "block", marginBottom: 4 }}
                >
                  Need Help?
                </Text>
                <Text style={{ color: "#64748b" }}>
                  If you have any questions or need assistance, contact us at{" "}
                  <a
                    href="mailto:support@easydeal.com"
                    style={{ color: "#667eea", fontWeight: 600 }}
                  >
                    support@easydeal.com
                  </a>
                </Text>
              </div>
            </div>
          </Card>
        </div>

        <div
          style={{
            margin: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Popconfirm
            title="Logout"
            description="Are you sure you want to logout?"
            open={open}
            onConfirm={handleLogout}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={() => setOpen(false)}
          >
            <Button type="primary" danger onClick={() => setOpen(true)}>
              Logout
            </Button>
          </Popconfirm>{" "}
          {/* <Button type="primary" onClick={() => clientRefresh()}>
            Refresh
          </Button> */}
        </div>
      </div>
      <AuthModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        isMobile={isMobile}
      />
    </>
  );
}

export default User;
