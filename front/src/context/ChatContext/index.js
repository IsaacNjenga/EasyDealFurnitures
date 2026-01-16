import { createContext, useContext, useState } from "react";
import { StreamChat } from "stream-chat";
import axios from "axios";
import { useUser } from "../UserContext";
import { useEffect } from "react";
import { useMemo } from "react";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export function ChatProvider({ children }) {
  const { guestId } = useUser();
  const [openChat, setOpenChat] = useState(false);
  const [channel, setChannel] = useState(null);
  const [streamLoading, setStreamLoading] = useState(false);

  const client = useMemo(
    () => StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY),
    []
  );

  const connect = async () => {
    setStreamLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/EasyDeal/guest-token",
        { guestId }
      );

      if (res.data.success) {
        const user = res.data.user;
        const token = res.data.token;

        await client.connectUser(user, token);

        const supportChannel = client.channel(
          "messaging",
          `support-${guestId}`,
          {
            members: [guestId, "6969f37d3eb7dc0e0453231c"],
            //type: "support",
          }
        );

        await supportChannel.watch();
        setChannel(supportChannel);
      }
    } catch (error) {
      console.error("Chat connection failed:", error);
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
