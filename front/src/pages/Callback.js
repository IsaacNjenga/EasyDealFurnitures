import { Button, Result } from "antd";
import {  useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import axios from "axios";
import TransactionStatusCard from "../components/StatusCard";

function Callback() {
  const [searchParams] = useSearchParams();
  const tracking_id = searchParams.get("OrderTrackingId");
  const [loading, setLoading] = useState(false);
  const [transactionStatusData, setTransactionStatusData] = useState(null);
  const openNotification = useNotification();

  const getTransactionStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `transaction-status?orderTrackingId=${tracking_id}`
      );
      console.log(res.data);
      setTransactionStatusData(res.data);

      const isSuccess =
        res.data?.payment_status_description?.toLowerCase() === "completed" ||
        res.data?.status_code === 1;

      if (isSuccess) {
        localStorage.removeItem("cart");
        openNotification(
          "success",
          "Payment confirmed! Your cart has been cleared.",
          "Thank you for your purchase."
        );
      }
    } catch (error) {
      openNotification(
        "error",
        "Failed to fetch transaction status. Contact us if the problem persists.",
        "Something went wrong..."
      );
      console.error(error);
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
      <div style={{ margin: "0 auto" }}>
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
        {transactionStatusData && (
          <TransactionStatusCard
            transactionStatusData={transactionStatusData}
          />
        )}
      </div>
    </div>
  );
}

export default Callback;

//const tracking_id = "c32d7d6c-6066-4e86-9185-db2170b087d9";
