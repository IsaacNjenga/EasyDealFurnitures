import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

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

const queryAdmin = async (req, res) => {
  try {
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const admin = await serverClient.queryUsers({ role: "admin" });
    return res.status(200).json({ success: true, admin: admin.users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error on fetching users" });
  }
};

export { guestToken, queryAdmin };
