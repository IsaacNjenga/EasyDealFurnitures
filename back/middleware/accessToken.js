import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const accessToken = async (req, res, next) => {
  const consumer_key = process.env.PESAPAL_CONSUMER_KEY;
  const consumer_secret = process.env.PESAPAL_CONSUMER_SECRET;
  const token_url = process.env.PESAPAL_TOKEN;

  try {
    const response = await axios.post(
      token_url,
      {
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    req.token = response.data.token;
    next();
  } catch (error) {
    console.error(
      "Error generating OAuth token:",
      error.response?.data || error.message
    );
    res.status(401).json({
      error: "Failed to authenticate with Pesapal",
      details: error.response?.data || error.message,
    });
  }
};

export { accessToken };