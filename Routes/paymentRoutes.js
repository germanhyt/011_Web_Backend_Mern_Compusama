import express from "express";
import {
  getPaymentAll,
  getPaymentByBilling,
  postPayment,
} from "../Controllers/payment.controller.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const paymentRoute = express.Router();

paymentRoute.get("/all", protect, admin, getPaymentAll);
paymentRoute.get("/:id", protect, getPaymentByBilling);
paymentRoute.post("/", protect, postPayment);

export default paymentRoute;
