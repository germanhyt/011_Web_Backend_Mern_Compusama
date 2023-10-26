import express from "express";

import {
  getOrderById,
  getOrderByLoginUser,
  getOrdersAll,
  postOrder,
  putOrderChangeState,
} from "../Controllers/order.controller.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const orderRoute = express.Router();

orderRoute.get("/all", protect, admin, getOrdersAll);
orderRoute.get("/", protect, getOrderByLoginUser);
orderRoute.get("/:id", protect, getOrderById);
orderRoute.post("/", protect, postOrder);
orderRoute.put("/state", protect, admin, putOrderChangeState);

export default orderRoute;
