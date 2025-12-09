import React, { useEffect, useState } from "react";
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
  //Spin,
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
// import AuthModal from "../components/AuthModal";
// import useFetchClient from "../hooks/fetchClient";
// import { format } from "date-fns";
import { useUser } from "../context/UserContext";
// import { useAuth } from "../context/AuthContext";

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
];

function User() {
  const { isMobile } = useUser();
  const [activeTabKey, setActiveTabKey] = useState("favourites");
  const [open, setOpen] = useState(false);
  const [favouritesData, setFavouritesData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const { client, clientLoading, fetchClient } = useFetchClient();
  // const { userLoggedIn, openAuthModal, setOpenAuthModal, currentUser, logout } =
  //   useAuth();

  // Effect to handle authentication and fetching
  // useEffect(() => {
  //   if (!userLoggedIn || !currentUser) {
  //     setOpenAuthModal(true);
  //     return;
  //   }

  //   if (currentUser?.email) {
  //     fetchClient(currentUser?.email);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser, userLoggedIn]);

  const user = {
    avatar:
      "https://plus.unsplash.com/premium_photo-1705091981908-a785a48510b6?w=900",
    name: "John Doe",
    email: "john.doe@email.com",
    memberSince: "December 2001",
    stats: {
      favourites: 2,
      reviews: 1,
      cart: 1,
    },
    favourites: [
      {
        _id: "690c6069d54e8ed27d568209",
        name: "Lounge Sofa",
        description:
          "Minimalist design with premium upholstery for a modern living space.",
        price: 64000,
        img: [
          "https://res.cloudinary.com/dinsdfwod/image/upload/v1762418705/bt5ao3ow7xetgh6ilyxr.jpg",
          "https://res.cloudinary.com/dinsdfwod/image/upload/v1762418705/zdl2eymjnajjgpiynbmv.jpg",
        ],
        colour: ["Purple", "yellow"],
        type: "Bed",
        category: "Living Room Furniture",
        freeShipping: true,
        available: true,
        stockCount: 19,
        shippingInformation: ["Ships within 1 day"],
        careGuide: [
          "Vacuum fabric regularly. Avoid direct sunlight to preserve color vibrancy.",
        ],
        tags: ["sofa", "lounge", "living"],
        discount: 10,
        createdAt: {
          $date: "2025-11-06T08:46:35.210Z",
        },
        updatedAt: {
          $date: "2025-11-06T08:46:35.210Z",
        },
        __v: 0,
      },
      {
        _id: "690c6069d54e8ed27d568210",
        name: "Lounge Sofa",
        description:
          "Minimalist design with premium upholstery for a modern living space.",
        price: 64000,
        img: [
          "https://res.cloudinary.com/dinsdfwod/image/upload/v1762418705/bt5ao3ow7xetgh6ilyxr.jpg",
          "https://res.cloudinary.com/dinsdfwod/image/upload/v1762418705/zdl2eymjnajjgpiynbmv.jpg",
        ],
        colour: ["Purple", "yellow"],
        type: "Bed",
        category: "Living Room Furniture",
        freeShipping: true,
        available: true,
        stockCount: 19,
        shippingInformation: ["Ships within 1 day"],
        careGuide: [
          "Vacuum fabric regularly. Avoid direct sunlight to preserve color vibrancy.",
        ],
        tags: ["sofa", "lounge", "living"],
        discount: 10,
        createdAt: {
          $date: "2025-11-06T08:46:35.210Z",
        },
        updatedAt: {
          $date: "2025-11-06T08:46:35.210Z",
        },
        __v: 0,
      },
    ],
    cart: [
      {
        _id: "690c6069d54e8ed27d568209",
        name: "Lounge Sofa",
        description:
          "Minimalist design with premium upholstery for a modern living space.",
        price: 64000,
        img: [
          "https://res.cloudinary.com/dinsdfwod/image/upload/v1762418705/bt5ao3ow7xetgh6ilyxr.jpg",
          "https://res.cloudinary.com/dinsdfwod/image/upload/v1762418705/zdl2eymjnajjgpiynbmv.jpg",
        ],
        colour: ["Purple", "yellow"],
        type: "Bed",
        category: "Living Room Furniture",
        freeShipping: true,
        available: true,
        stockCount: 19,
        shippingInformation: ["Ships within 1 day"],
        careGuide: [
          "Vacuum fabric regularly. Avoid direct sunlight to preserve color vibrancy.",
        ],
        tags: ["sofa", "lounge", "living"],
        discount: 10,
        createdAt: {
          $date: "2025-11-06T08:46:35.210Z",
        },
        updatedAt: {
          $date: "2025-11-06T08:46:35.210Z",
        },
        __v: 0,
      },
    ],
    reviews: [
      {
        _id: "691b355ef9cf0b7168c606db",
        name: "Isaac N",
        email: "isaac@email.com",
        rating: 4.5,
        review: "Very nice piece of equipment",
        productId: {
          _id: "690c6069d54e8ed27d568209",
          name: "Lounge Sofa",
          description:
            "Minimalist design with premium upholstery for a modern living space.",
          price: 64000,
          img: [
            "https://res.cloudinary.com/dinsdfwod/image/upload/v1762418705/bt5ao3ow7xetgh6ilyxr.jpg",
            "https://res.cloudinary.com/dinsdfwod/image/upload/v1762418705/zdl2eymjnajjgpiynbmv.jpg",
          ],
          colour: ["Purple", "yellow"],
          type: "Bed",
          category: "Living Room Furniture",
          freeShipping: true,
          available: true,
          stockCount: 19,
          shippingInformation: ["Ships within 1 day"],
          careGuide: [
            "Vacuum fabric regularly. Avoid direct sunlight to preserve color vibrancy.",
          ],
          tags: ["sofa", "lounge", "living"],
          discount: 10,

          reviews: [
            {
              _id: "691b355ef9cf0b7168c606db",
              name: "Isaac N",
              email: "isaac@email.com",
              rating: 4.5,
              review: "Very nice piece of property",
              propertyId: "6912e3ffaf42a9dfb7c24e81",
              createdAt: "2025-11-17T14:46:54.290Z",
              updatedAt: "2025-11-17T14:46:54.290Z",
              __v: 0,
              title: "Nice place",
            },
            {
              _id: "691b145794ff1f7f77ad4a39",
              name: "Isaac Njenga",
              rating: 5,
              review: "I loved it so much I want to buy another!",
              propertyId: "6912e3ffaf42a9dfb7c24e81",
              createdAt: "2025-11-17T12:25:59.560Z",
              updatedAt: "2025-11-17T12:25:59.560Z",
              __v: 0,
              email: "ayzzoh20@gmail.com",
              title: "The best",
            },
          ],
          analytics: [
            {
              _id: "69258648d5acc9951d48fa97",
              propertyId: "6912e3ffaf42a9dfb7c24e81",
              __v: 0,
              clicks: 4,
              createdAt: "2025-11-25T10:34:48.554Z",
              updatedAt: "2025-11-26T12:02:00.112Z",
              views: 0,
              likes: 0,
            },
          ],
        },
        createdAt: "2025-11-17T14:46:54.290Z",
        updatedAt: "2025-11-17T14:46:54.290Z",
        title: "Nice place",
      },
    ],
  };

  // Effect to update local state when client data is loaded
  // useEffect(() => {
  //   if (client) {
  //     setFavouritesData(client.favourites || []);
  //     setReviewsData(client.reviews || []);
  //     setCartData(client.cart || []);
  //   }
  // }, [client]);

  useEffect(() => {
    if (user) {
      setFavouritesData(user.favourites || []);
      setReviewsData(user.reviews || []);
      setCartData(user.cart || []);
    }
    //eslint-disable-next-line
  }, []);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  // if (!userLoggedIn || !currentUser) {
  //   return (
  //     <AuthModal
  //       openAuthModal={openAuthModal}
  //       setOpenAuthModal={setOpenAuthModal}
  //       isMobile={isMobile}
  //     />
  //   );
  // }

  // Loading state
  // if (clientLoading) {
  //   return <Spin size="large" fullscreen tip="Loading..." />;
  // }

  // const user = {
  //   avatar: client?.avatar,
  //   name: client?.name || currentUser?.displayName || currentUser?.email,
  //   email: client?.email || currentUser?.email,
  //   memberSince: client?.createdAt
  //     ? format(new Date(client.createdAt), "MMMM yyyy")
  //     : format(new Date(), "MMMM yyyy"),
  //   stats: {
  //     favourites: client?.stats?.favourites || 0,
  //     reviews: client?.stats?.reviews || 0,
  //     viewings: client?.stats?.viewings || 0,
  //   },
  // };

  const contentListNoTitle = {
    favourites: <MyFavourites favouritesData={favouritesData} />,
    reviews: <MyReviews reviewsData={reviewsData} />,
    cart: <MyCart cartData={cartData} />,
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
            height: 500,
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
            {/* {currentUser?.photoURL ? (
              <Avatar src={currentUser?.photoURL} size={isMobile ? 90 : 100} />
            ) : (
              <Avatar size={isMobile ? 90 : 100}>
                {currentUser?.displayName[0]}
              </Avatar>
            )} */}
            <Avatar
              src={
                "https://plus.unsplash.com/premium_photo-1705091981908-a785a48510b6?w=900"
              }
              size={isMobile ? 90 : 100}
            />

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
              bodyStyle={{ padding: isMobile ? "20px 16px" : "16px 36px" }}
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
            bodyStyle={{ padding: 0 }}
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
            bodyStyle={{ padding: isMobile ? 20 : 24 }}
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
            onConfirm={() => {
              setConfirmLoading(true);

              setTimeout(() => {
                //logout();
                console.log("logout");
                setOpen(false);
                setConfirmLoading(false);
              }, 1000);
            }}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={() => setOpen(false)}
          >
            <Button type="primary" danger onClick={() => setOpen(true)}>
              Logout
            </Button>
          </Popconfirm>
        </div>
      </div>{" "}
      {/* <AuthModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        isMobile={isMobile}
      /> */}
    </>
  );
}

export default User;
