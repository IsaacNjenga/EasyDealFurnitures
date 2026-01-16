import "stream-chat-react/dist/css/v2/index.css";
import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "../assets/css/stream-overrides.css";
import "../App.css";
import { useChat } from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import { Spin } from "antd";
import CustomSupportHeader from "./CustomHeader";

function CustomerChat() {
  const { client, channel, streamLoading, openChat } = useChat();
  const { guestId } = useUser();

  if (!client || !channel) return null;

  if (streamLoading) return <Spin size="large" />;

  return (
    <>
      {openChat && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: window.innerWidth <= 768 ? "calc(100vw - 32px)" : "400px",
            height: "600px",
            maxHeight: "calc(100vh - 100px)",
            backgroundColor: "#fff",
            borderRadius: "6px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Chat Content */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <Chat client={client} theme="str-chat__theme-dark" key={guestId}>
              <div className="chat-layout" style={{ margin: 0, padding: 0 }}>
                <main className="chat-main">
                  <Channel channel={channel}>
                    <Window>
                      <CustomSupportHeader />

                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </main>
              </div>
            </Chat>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerChat;
