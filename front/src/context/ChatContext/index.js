import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export function ChatProvider({ children }) {
  const [openChat, setOpenChat] = useState(false);

  const toggleChatDrawer = () => setOpenChat(!openChat);

  const value = { openChat, setOpenChat,toggleChatDrawer };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
