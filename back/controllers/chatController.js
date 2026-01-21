import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
import { AIResponse } from "../util/AIResponse.js";

dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

const serverClient = StreamChat.getInstance(api_key, api_secret);

const guestToken = async (req, res) => {
  const { guestId, username } = req.body;

  if (!guestId) {
    return res.status(400).json({ message: "Guest ID is required" });
  }
  try {
    const token = serverClient.createToken(guestId);

    res.status(200).json({
      success: "true",
      user: { id: guestId, name: username, role: "guest" },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to generate guest token" });
  }
};

const adminStatus = async (req, res) => {
  try {
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const admin = await serverClient.queryUsers({
      role: "admin",
    });
    const availableAdmins = admin.users.filter(
      (user) =>
        user.online === true &&
        user.banned === false &&
        user.shadow_banned === false &&
        user.id !== "isaac49",
    );
    // console.log(availableAdmins);
    return res.status(200).json({
      success: true,
      admin: availableAdmins?.map((a) => ({
        id: a.id,
        username: a.username,
        online: a.online,
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get admin status" });
  }
};

const queryAdmin = async (req, res) => {
  const { channelId } = req.body;
  try {
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const channel = chatClient.channel("messaging", channelId);

    const admin = await serverClient.queryUsers({
      role: "admin",
    });

    const availableAdmins = admin.users.filter(
      (user) =>
        user.online === true &&
        user.banned === false &&
        user.shadow_banned === false,
    );

    if (!availableAdmins) {
      await channel.query({
        messages: { limit: 1 },
      });

      const messages = channel.state.messages;

      if (!messages.length) {
        return res.status(200).json({ message: "No messages found" });
      }

      const lastMessage = messages[0];

      if (!lastMessage) {
        return res.status(200).json({ message: "No messages found" });
      }

      if (lastMessage.user.role === "admin") {
        return res.sendStatus(200);
      }

      // If an admin has spoken recently, do NOT reply
      const recentAdminMessage = messages.some((m) => m.user.role === "admin");

      if (recentAdminMessage) return;

      const aiReply = await AIResponse(lastMessage.text);
      await channel.sendMessage(channelId, {
        text: aiReply,
        user_id: "ai-support-bot",
      });
    } else {
      return res.status(200).json({
        success: true,
        admin: availableAdmins,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error on fetching users" });
  }
};

export { guestToken, queryAdmin, adminStatus };
