import { Button, Result, Spin } from "antd";
import { useEffect, useState } from "react";
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
        `https://easy-deal-furnitures-dbdd.vercel.app/EasyDeal/transaction-status?orderTrackingId=${tracking_id}`
      );
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

      const response = await axios.put(
        `https://easy-deal-admin-server.vercel.app/EasyAdmin/client-order-update?tracking_id=${tracking_id}`,
        { updateData: res.data }
      );

      if (response.data.success) {
        openNotification(
          "success",
          "Transaction confirmed!",
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

  useEffect(() => {
    getTransactionStatus();
    //eslint-disable-next-line
  }, []);

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
              <Button type="primary">
                <Link to="/">Go Back Home</Link>
              </Button>
            </>
          }
        />
      </div>

      {loading ? (
        <div>
          <Spin
            size="large"
            style={{ display: "block", margin: "40px auto" }}
          />
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>
          <TransactionStatusCard
            transactionStatusData={transactionStatusData}
          />
        </div>
      )}
    </div>
  );
}

export default Callback;

//const tracking_id = "c32d7d6c-6066-4e86-9185-db2170b087d9";

//OrderTrackingId=2e715d79-0c34-487e-85f3-dadc0daea688
