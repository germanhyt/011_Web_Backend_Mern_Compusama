import express from "express";
import {
  getDetailsOrderAll,
  getDetailsOrderByOrder,
  postDetailsOrder,
} from "../Controllers/detailsOrder.controller.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const detailsOrderRoute = express.Router();

detailsOrderRoute.get("/all", protect, admin, getDetailsOrderAll);
detailsOrderRoute.get("/:id", protect, getDetailsOrderByOrder);
detailsOrderRoute.post("/", protect, postDetailsOrder);

export default detailsOrderRoute;
