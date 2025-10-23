import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
function Cancel() {
  return (
    <div
      style={{
        background: "whitesmoke",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          margin: "0 auto",
        }}
      >
        <Result
          status="error"
          title="Order Cancelled"
          subTitle="Your order has been cancelled. Click the button below to go back to the home page"
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

export default Cancel;
