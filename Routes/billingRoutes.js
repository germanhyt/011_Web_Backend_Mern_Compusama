import express from "express";
import { getBillingAll, getBillingsByOrder, postBilling } from "../Controllers/billing.controller";

const billingRoute = express.Router();

billingRoute.get("/all", getBillingAll);
billingRoute.get("/:id", getBillingsByOrder);
billingRoute.get("/", postBilling);

export default billingRoute;
