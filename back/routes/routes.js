import express from "express";
import {
  submitOrder,
  transactionStatus,
} from "../controllers/pesapalController.js";
import { accessToken } from "../middleware/accessToken.js";

const router = express.Router();

//pesapal endpoints
router.post("/initiate-payment", accessToken, submitOrder);
router.get("/transaction-status", accessToken, transactionStatus);

export { router as Router };
