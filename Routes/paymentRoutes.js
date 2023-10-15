import express from "express";
import { getPaymentAll, getPaymentByBilling, postPayment } from "../Controllers/payment.controller";

const paymentRoute = express.Router();

paymentRoute.get("/all", getPaymentAll);
paymentRoute.get("/:id", getPaymentByBilling);
paymentRoute.post("/", postPayment);

export default stockRoute;


