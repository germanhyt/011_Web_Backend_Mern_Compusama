import express from "express";
import {
  getDetailsBillingAll,
  getDetailsByBilling,
  postDetailsBilling,
} from "../Controllers/detailsBilling.controller.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const detailsBillingRoute = express.Router();

detailsBillingRoute.get("/all", protect, admin, getDetailsBillingAll);
detailsBillingRoute.get("/:idBilling", protect, admin, getDetailsByBilling);
detailsBillingRoute.post("/", protect, postDetailsBilling);

export default detailsBillingRoute;
