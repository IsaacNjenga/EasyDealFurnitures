import { createContext, useContext, useState } from "react";
import { StreamChat } from "stream-chat";
import axios from "axios";
import { useUser } from "../UserContext";
import { useEffect } from "react";
import { useMemo } from "react";
import { faker } from "@faker-js/faker";
import { useNotification } from "../NotificationContext";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export function ChatProvider({ children }) {
  const { guestId } = useUser();
  const [openChat, setOpenChat] = useState(false);
  const [channel, setChannel] = useState(null);
  const [streamLoading, setStreamLoading] = useState(false);
  const openNotification = useNotification();

  const client = useMemo(
    () => StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY),
    [],
  );

  const fetchAdminStatus = async () => {
    try {
      const res = await axios.get(
        "https://easy-deal-furnitures-dbdd.vercel.app/EasyDeal/admin-status",
      );

      if (res.data.success && res.data.admin.length > 0) {
        return res.data.admin[0];
      }

      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const connect = async () => {
    setStreamLoading(true);
    const username = faker.internet.username();

    try {
      const res = await axios.post(
        // "http://localhost:3001/EasyDeal/guest-token",
        "https://easy-deal-furnitures-dbdd.vercel.app/EasyDeal/guest-token",
        { guestId: guestId, username: username },
      );

      if (res.data.success) {
        const user = res.data.user;
        const token = res.data.token;

        await client.connectUser(user, token);

        const admin = await fetchAdminStatus();

        const members = admin
          ? [guestId, admin.id, "ai-support-bot"]
          : [guestId, "ai-support-bot"];

        const supportChannel = client.channel(
          "messaging",
          `support-${guestId}`,
          { members },
        );

        await supportChannel.watch();
        setChannel(supportChannel);

        if (!admin) {
          openNotification("warning", "AI assistant is helping you for now");
        }
      }
    } catch (error) {
      console.error("Chat connection failed:", error);
      openNotification(
        "error",
        "Chat connection failed. Kindly try again later",
        "Error",
      );
    } finally {
      setStreamLoading(false);
    }
  };

  const disconnect = async () => {
    setChannel(null);
    await client.disconnectUser();
  };

  useEffect(() => {
    if (!openChat) return;

    connect();

    return () => {
      disconnect();
    };
    // eslint-disable-next-line
  }, [openChat]);

  const toggleChatDrawer = () => setOpenChat(!openChat);

  const value = {
    openChat,
    setOpenChat,
    toggleChatDrawer,
    streamLoading,
    client,
    channel,
    setChannel,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
