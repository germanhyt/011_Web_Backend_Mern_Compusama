import express from "express";
import { getDetailsBillingAll, getDetailsByBilling, getDetailsByProduct, postDetailsBilling } from "../Controllers/detailsBilling.controller";

const detailsBillingRoute = express.Router();

detailsBillingRoute.get("/all", getDetailsBillingAll);
detailsBillingRoute.get("/:id", getDetailsByBilling);
detailsBillingRoute.get("/:id", getDetailsByProduct);
detailsBillingRoute.post("/", postDetailsBilling);

export default detailsBillingRoute;
