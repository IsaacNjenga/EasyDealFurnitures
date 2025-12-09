import { useState } from "react";
import { Button, Card, Form, Input, Typography, Space, Divider } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { signInWithGoogle } from "../provider/AuthProvider/index.js";
import axios from "axios";
import { useUser } from "../context/UserContext/index.js";
import { useNotification } from "../context/NotificationContext/index.js";
import { useAuth } from "../context/AuthContext/index.js";

const { Title, Text } = Typography;

function Auth() {
  const [form] = Form.useForm();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useUser();
  const openNotification = useNotification();
  const { login, setOpenAuthModal } = useAuth();

  const toggleSignIn = () => {
    setIsSignIn((prev) => !prev);
    form.resetFields();
  };

  const handleEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleBack = () => {
    setShowEmailForm(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const payload = isSignIn
        ? { email: values.email, password: values.password }
        : { email: values.email, name: values.name, password: values.password };

      const res = await axios.post(
        `${
          isSignIn
            ? `https://easy-deal-admin-server.vercel.app/EasyAdmin/client-sign-in`
            : `https://easy-deal-admin-server.vercel.app/EasyAdmin/client-sign-up`
        }`,
        payload
      );

      const { success, token, user } = res.data;

      if (success) {
        openNotification(
          "success",
          !isSignIn
            ? "Your account has been created successfully. Proceed to login."
            : "You are now logged in. Welcome to EasyDeal Furnitures!",
          "Success"
        );
        form.resetFields();
        if (!isSignIn) {
          setIsSignIn(true);
          return;
        }

        const userDetails = {
          displayName: user.name,
          photoURL: user.avatar,
          email: user.email,
        };

        login(userDetails, token);

        setTimeout(() => {
          setOpenAuthModal(false);
        }, 2500);
      } else {
        openNotification(
          "error",
          res.data.message,
          "Something went wrong. Please try again or contact us for assistance"
        );
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error?.data?.message || error?.message;
      openNotification(
        "error",
        errorMessage,
        "Something went wrong. Please try again or contact us for assistance"
      );
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const { user, idToken } = await signInWithGoogle();

      const res = await axios.post(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/firebase-google-login`,
        {
          idToken,
        }
      );

      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        login(user, token);
        openNotification(
          "success",
          "You are now logged in. Welcome to EasyDeal Furnitures!",
          "Success"
        );
      } else
        openNotification(
          "error",
          res.data.message,
          "Something went wrong. Please try again or contact us for assistance"
        );
    } catch (error) {
      console.error(error);
      openNotification(
        "error",
        error.message,
        "Something went wrong. Please try again or contact us for assistance"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "10px" : "0px",
        position: "relative",
        overflow: "hidden",
        minHeight: isMobile ? "100vh" : "auto",
      }}
    >
      {/* Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.1)",
          filter: "blur(80px)",
        }}
      />

      {/* Main Card */}
      <Card
        style={{
          maxWidth: isMobile ? "100%" : 700,
          width: "100%",
          background: "rgba(0, 0, 0)",
          backdropFilter: "blur(20px)",
          borderRadius: 24,
          border: "none",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 1,
        }}
        bodyStyle={{
          padding: isMobile ? "32px 26px" : "20px 40px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <img
            src="https://res.cloudinary.com/dinsdfwod/image/upload/v1765199954/office-chair1_xlt5fs.png"
            alt="Logo"
            style={{
              height: isMobile ? 80 : 120,
              marginBottom: 8,
              borderRadius: "50%",
              //border: "2px solid #918f76",
            }}
          />
          <Title
            level={2}
            style={{
              margin: 0,
              fontFamily: "Alegreya Sans",
              background: "linear-gradient(135deg, #bdb890, #8a8560)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {isSignIn ? "Welcome Back" : "Create Account"}
          </Title>
          <Text
            style={{
              fontSize: 14,
              color: "#64748b",
              fontFamily: "Raleway",
              margin: 0,
            }}
          >
            {isSignIn
              ? "Sign in to access your account"
              : "Join us to find your ideal furniture"}
          </Text>
        </div>

        {/* Authentication Options or Form */}
        {!showEmailForm ? (
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              loading={loading}
              size="large"
              block
              icon={<GoogleOutlined style={{ fontSize: 20 }} />}
              style={{
                height: 56,
                borderRadius: 16,
                fontFamily: "Raleway",
                fontWeight: 600,
                fontSize: 16,
                border: "2px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#bdb890";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(189, 184, 144, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Continue with Google
            </Button>

            <Divider style={{ margin: "4px 0", borderColor: "#bdb890" }}>
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 14,
                  fontFamily: "Raleway",
                }}
              >
                Or
              </Text>
            </Divider>

            {/* Email Sign In */}
            <Button
              onClick={handleEmailClick}
              size="large"
              block
              icon={<MailOutlined style={{ fontSize: 20 }} />}
              style={{
                height: 56,
                borderRadius: 16,
                fontFamily: "Raleway",
                fontWeight: 600,
                fontSize: 16,
                background: "linear-gradient(135deg, #bdb890, #a8a378)",
                border: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                boxShadow: "0 4px 16px rgba(189, 184, 144, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(189, 184, 144, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(189, 184, 144, 0.3)";
              }}
            >
              Continue with Email
            </Button>

            {/* Toggle Sign In/Up */}
            <div style={{ textAlign: "center", marginTop: 18 }}>
              <Text style={{ color: "#64748b", fontFamily: "Raleway" }}>
                {isSignIn
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  onClick={toggleSignIn}
                  style={{
                    color: "#bdb890",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {isSignIn ? "Sign Up" : "Sign In"}
                </span>
              </Text>
            </div>
          </Space>
        ) : (
          // Email Form
          <div>
            {/* Back Button */}
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              style={{
                marginBottom: 24,
                color: "#64748b",
                fontFamily: "Raleway",
                fontWeight: 600,
              }}
            >
              Back to options
            </Button>

            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
            >
              {/* name - Sign Up only*/}
              {!isSignIn && (
                <Form.Item
                  label={
                    <Text
                      strong
                      style={{
                        fontSize: 15,
                        fontFamily: "Raleway",
                        color: "#f2f4f8ff",
                      }}
                    >
                      Name
                    </Text>
                  }
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: "#bdb890" }} />}
                    placeholder="John Doe"
                    size="large"
                    style={{
                      borderRadius: 12,
                      fontFamily: "Raleway",
                      border: "2px solid #e2e8f0",
                      height: 48,
                    }}
                  />
                </Form.Item>
              )}

              {/* Email */}
              <Form.Item
                label={
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#f2f4f8ff",
                    }}
                  >
                    Email Address
                  </Text>
                }
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "#bdb890" }} />}
                  placeholder="your@email.com"
                  size="large"
                  style={{
                    borderRadius: 12,
                    fontFamily: "Raleway",
                    border: "2px solid #e2e8f0",
                    height: 48,
                  }}
                />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label={
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                      fontFamily: "Raleway",
                      color: "#f2f4f8ff",
                    }}
                  >
                    Password
                  </Text>
                }
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 8, message: "Password must be at least 8 characters" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#bdb890" }} />}
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  size="large"
                  style={{
                    borderRadius: 12,
                    fontFamily: "Raleway",
                    border: "2px solid #e2e8f0",
                    height: 48,
                  }}
                />
              </Form.Item>

              {/* Confirm Password (Sign Up only) */}
              {!isSignIn && (
                <Form.Item
                  label={
                    <Text
                      strong
                      style={{
                        fontSize: 15,
                        fontFamily: "Raleway",
                        color: "#f2f4f8ff",
                      }}
                    >
                      Confirm Password
                    </Text>
                  }
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "#bdb890" }} />}
                    placeholder="Confirm your password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    size="large"
                    style={{
                      borderRadius: 12,
                      fontFamily: "Raleway",
                      border: "2px solid #e2e8f0",
                      height: 48,
                    }}
                  />
                </Form.Item>
              )}

              {/* Forgot Password (Sign In only) */}
              {isSignIn && (
                <div style={{ textAlign: "right", marginBottom: 24 }}>
                  <Text
                    style={{
                      color: "#bdb890",
                      cursor: "pointer",
                      fontFamily: "Raleway",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Forgot password?
                  </Text>
                </div>
              )}

              {/* Submit Button */}
              <Form.Item style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                  style={{
                    height: 56,
                    borderRadius: 16,
                    fontFamily: "Raleway",
                    fontWeight: 600,
                    fontSize: 16,
                    background: "linear-gradient(135deg, #bdb890, #a8a378)",
                    border: "none",
                    boxShadow: "0 4px 16px rgba(189, 184, 144, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(189, 184, 144, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(189, 184, 144, 0.3)";
                  }}
                >
                  {loading
                    ? isSignIn
                      ? "Signing in..."
                      : "Creating account..."
                    : isSignIn
                    ? "Sign In"
                    : "Create Account"}
                </Button>
              </Form.Item>

              {/* Toggle Sign In/Up */}
              <div style={{ textAlign: "center" }}>
                <Text style={{ color: "#64748b", fontFamily: "Raleway" }}>
                  {isSignIn
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <span
                    onClick={toggleSignIn}
                    style={{
                      color: "#bdb890",
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {isSignIn ? "Sign Up" : "Sign In"}
                  </span>
                </Text>
              </div>
            </Form>
          </div>
        )}

        {/* Terms & Privacy */}
        <div
          style={{
            textAlign: "center",
            marginTop: 22,
            paddingTop: 12,
            borderTop: "1px solid #bdb890",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: "#94a3b8",
              fontFamily: "Raleway",
            }}
          >
            By continuing, you agree to our{" "}
            <span
              style={{ color: "#bdb890", cursor: "pointer", fontWeight: 600 }}
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              style={{ color: "#bdb890", cursor: "pointer", fontWeight: 600 }}
            >
              Privacy Policy
            </span>
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default Auth;
