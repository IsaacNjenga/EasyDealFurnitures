import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Callback() {
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
            <Button type="primary">
              <Link to="/">Go Back Home</Link>
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default Callback;
