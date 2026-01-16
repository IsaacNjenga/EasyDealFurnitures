import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
import randomName from "node-random-name";

dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

const serverClient = StreamChat.getInstance(api_key, api_secret);

const guestToken = async (req, res) => {
  const { guestId } = req.body;
  if (!guestId) {
    return res.status(400).json({ message: "Guest ID is required" });
  }
  try {
    const token = serverClient.createToken(guestId);

    const name = randomName({ first: true });

    res.status(200).json({
      success: "true",
      user: { id: guestId, name: name, role: "guest" },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to generate guest token" });
  }
};

export { guestToken };
