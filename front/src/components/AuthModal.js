import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Auth from "../pages/Auth";

function AuthModal({ openAuthModal, setOpenAuthModal, isMobile }) {
  return (
    <Modal
      open={openAuthModal}
      footer={null}
      centered
      onCancel={() => setOpenAuthModal(false)}
      closable={true}
      width={isMobile ? "auto" : "600px"}
      style={{ top: 10 }}
      styles={{
        mask: { backdropFilter: "blur(1px)" },
        content: {
          background: 0,
          border: "none",
          borderRadius: 12,
          overflow: "hidden",
          padding: 0,
        },
      }}
      closeIcon={
        <CloseOutlined
          style={{
            color: "#fff",
            background: "rgba(0, 0, 0, 0.39)",
            padding: 6,
            borderRadius: "50%",
            fontSize: 20,
            marginBottom: 80,
            marginLeft: 10,
          }}
        />
      }
    >
      <Auth />
    </Modal>
  );
}

export default AuthModal;
