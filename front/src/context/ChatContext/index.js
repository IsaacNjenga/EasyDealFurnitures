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
  const [isOnline, setIsOnline] = useState(false);
  const [activeAdminId, setActiveAdminId] = useState(null);
  const [activeAdminName, setActiveAdminName] = useState(null);
  const [streamLoading, setStreamLoading] = useState(false);
  const openNotification = useNotification();

  const client = useMemo(
    () => StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY),
    [],
  );

  const isAdminOnline = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:3001/EasyDeal/admin-status",
        "https://easy-deal-furnitures-dbdd.vercel.app/EasyDeal/admin-status",
      );

      if (res.status.success) {
        const status = res.data.admin[0].online;
        console.log("id", res.data.admin[0].id);
        console.log("status", status);
        if (status === true) {
          setIsOnline(true);
          setActiveAdminId(res.data.admin[0].id);
          setActiveAdminName(res.data.admin[0].username);
        } else {
          setIsOnline(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(isAdminOnline, 15000);
    return () => clearInterval(interval);
  }, []);

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

        if (isOnline) {
          const supportChannel = client.channel(
            "messaging",
            `support-${guestId}`,
            {
              members: [guestId, activeAdminId, "ai-support-bot"].filter(
                Boolean,
              ),
            },
          );
          await supportChannel.watch();
          setChannel(supportChannel);
        } else {
          //introduce AI here

          openNotification("warning", "AI Takeover", "Error");
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
