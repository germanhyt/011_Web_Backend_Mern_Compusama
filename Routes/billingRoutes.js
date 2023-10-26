import express from "express";
import {
  getBillingAll,
  getBillingsByOrder,
  postBilling,
} from "../Controllers/billing.controller.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const billingRoute = express.Router();

billingRoute.get("/all", protect, admin, getBillingAll);
billingRoute.get("/:id", protect, getBillingsByOrder);
billingRoute.post("/", protect, postBilling);

export default billingRoute;
