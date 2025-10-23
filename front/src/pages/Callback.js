import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Callback() {
  return (
    <Result
      status="success"
      title="Transaction Successful"
      subTitle="Your order has been successfully processed. We will be in touch with you shortly to confirm delivery details."
    >
      <Button type="primary">
        <Link to="/">Go Back Home</Link>
      </Button>
    </Result>
  );
}

export default Callback;
