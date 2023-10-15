import express from "express";

import { getOrderById, getOrdersAll, postOrder, putOrderIsDelivered, putOrderIsPaid } from "../Controllers/order.controller.js";

const orderRoute = express.Router();

orderRoute.get("/all", getOrdersAll);
orderRoute.get("/:id", getOrderById)
orderRoute.post("/", postOrder);
orderRoute.put("/:id/pay", putOrderIsPaid);
orderRoute.put("/:id/delivered", putOrderIsDelivered);

export default orderRoute;
