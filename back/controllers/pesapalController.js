import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const submission_url = process.env.PESAPAL_SUBMISSION_URL;
const transaction_url = process.env.PESAPAL_TRANSACTION_URL;
const notification_id = process.env.PESAPAL_IPN_ID;
const callback_url = process.env.CALLBACK_URL;
const cancellation_url = process.env.CANCELLATION_URL;

const submitOrder = async (req, res) => {
  const { amount, phone_number, email, first_name, last_name } = req.body;

  console.log("body", req.body);

  try {
    const token = req.token;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: "Invalid amount. Please provide an amount greater than 0.",
      });
    }

    if (!phone_number) {
      return res.status(400).json({
        error: "Invalid phone number. Please provide a valid phone number.",
      });
    }

    const formattedAmount = parseFloat(amount).toFixed(2);

    const orderDetails = {
      id: `order-${Date.now()}`,
      amount: formattedAmount,
      currency: "KES",
      description: "EasyDeal Furnitures",
      callback_url: callback_url,
      cancellation_url: cancellation_url,
      notification_id: notification_id,
      billing_address: {
        email: email,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
      },
    };

    //console.log("Order Details:", orderDetails);

    const response = await axios.post(submission_url, orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const { redirect_url, order_tracking_id } = response.data;
    //console.log("full response:", response.data);

    res.status(200).json({
      redirectUrl: redirect_url,
      orderTrackingId: order_tracking_id,
    });
  } catch (error) {
    console.error(
      "Error initiating payment:",
      error.response?.data || error.message
    );

    res.status(500).send("Failed to initiate payment");
  }
};

const transactionStatus = async (req, res) => {
  const { orderTrackingId } = req.query;

  //console.log("Query Parameters:", req.query);
  //console.log("orderTrackingId", orderTrackingId);

  const token = req.token;
  const fullUrl = `${transaction_url}${orderTrackingId}`;

  try {
    const response = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    res.status(500).send("Failed to fetch transaction status");
  }
};

export { submitOrder, transactionStatus };
