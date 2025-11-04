import { Button, Result } from "antd";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import axios from "axios";

function Callback() {
  const [searchParams] = useSearchParams();
  const tracking_id = searchParams.get("OrderTrackingId");

  console.log("OrderTrackingId:", tracking_id);
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();
  const getTransactionStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`transaction-status/${tracking_id}`);
      console.log(res.data);
      // openNotification(
      //   "success",
      //   "Transaction status fetched successfully.",
      //   "Success!"
      // );
    } catch (error) {
      openNotification(
        "error",
        "Failed to fetch transaction status. Contact us if the problem persists.",
        "Something went wrong..."
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "whitesmoke",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          margin: "0 auto",
        }}
      >
        <Result
          status="success"
          title="Transaction Successful"
          subTitle="Your order has been successfully processed. We will be in touch with you shortly to confirm delivery details."
          extra={
            <>
              <Button
                type="primary"
                onClick={getTransactionStatus}
                loading={loading}
                style={{
                  background: "green",
                  borderColor: "green",
                }}
              >
                {loading ? "Loading..." : "View Transaction Status"}
              </Button>
              <Button type="primary">
                <Link to="/">Go Back Home</Link>
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
}

export default Callback;


//cfbb4f2a-f256-4e1a-8d20-db21904d95d0