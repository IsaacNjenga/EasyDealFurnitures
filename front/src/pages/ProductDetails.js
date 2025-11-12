import React from "react";
import { useSearchParams } from "react-router-dom";

function ProductDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

//   `/product?id=${id}`;

  return <div>ProductDetails</div>;
}

export default ProductDetails;
