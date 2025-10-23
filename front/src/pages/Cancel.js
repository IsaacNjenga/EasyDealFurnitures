import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
function Cancel() {
  return (
    <Result
      status="warning"
      title="Order Cancelled"
      subTitle="Your order has been cancelled. Click the button below to go back to the home page"
      extra={
        <Button type="primary">
          <Link to="/">Go Back Home</Link>
        </Button>
      }
    />
  );
}

export default Cancel;

