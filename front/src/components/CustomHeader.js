import { useMemo } from "react";
import { useChannelStateContext } from "stream-chat-react";
import { CloseOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { useChat } from "../context/ChatContext";

function CustomSupportHeader() {
  const { channel } = useChannelStateContext();
  const { setOpenChat } = useChat();

  const adminOnline = useMemo(() => {
    if (!channel?.state?.members) return false;

    return Object.values(channel.state.members).some(
      (member) => member.user?.online === true
    );
  }, [channel?.state?.members]);

  const statusConfig = adminOnline
    ? {
        label: "Online",
        color: "#4ade80",
        bg: "rgba(74, 222, 128, 0.15)",
        glow: "rgba(74, 222, 128, 0.35)",
      }
    : {
        label: "Offline — leave a message",
        color: "#fbbf24",
        bg: "rgba(251, 191, 36, 0.15)",
        glow: "rgba(251, 191, 36, 0.35)",
      };

  return (
    <header className="support-header">
      {/* Left */}
      <div className="support-left">
        <div className="support-avatar">
          <CustomerServiceOutlined />
        </div>

        <div className="support-meta">
          <h4>EasyDeal Support</h4>

          <div
            className="support-status"
            style={{ backgroundColor: statusConfig.bg }}
          >
            <span
              className={`status-dot ${adminOnline ? "online" : "offline"}`}
              style={{
                backgroundColor: statusConfig.color,
                boxShadow: `0 0 0 3px ${statusConfig.glow}`,
              }}
            />
            <span className="status-text">{statusConfig.label}</span>
          </div>
        </div>
      </div>

      {/* Close */}
      <button
        className="support-close"
        onClick={() => setOpenChat(false)}
        aria-label="Close chat"
      >
        <CloseOutlined style={{ color: "#fff" }} />
      </button>

      {/* Inline styles for portability */}
      <style>{`
        .support-header {
          background: linear-gradient(to left, #ffa44b 0%, #ffa44b 100%);
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .support-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .support-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.35);
        }

        .support-avatar svg {
          font-size: 22px;
          color: #fff;
        }

        .support-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .support-meta h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.3px;
        }

        .support-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          backdrop-filter: blur(2px);
          width: fit-content;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.online {
          animation: pulse 1.8s ease-in-out infinite;
        }

        .status-text {
          font-size: 11px;
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          white-space: nowrap;
        }

        .support-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
        }

        .support-close:hover {
          opacity: 0.8;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
    </header>
  );
}

export default CustomSupportHeader;
