import "stream-chat-react/dist/css/v2/index.css";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "../assets/css/stream-overrides.css";
import "../App.css";
import { useChat } from "../context/ChatContext";
import { useUser } from "../context/UserContext";

function CustomerChat() {
  const { client, channel, streamLoading } = useChat();
  const { guestId } = useUser();

  if (!client || !channel || streamLoading) return null;

  return (
    <Chat client={client} theme="str-chat__theme-dark" key={guestId}>
      <div className="chat-layout">
        <main className="chat-main">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </main>
      </div>
    </Chat>
  );
}

export default CustomerChat;
