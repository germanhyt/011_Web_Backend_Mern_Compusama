import express from "express";
import {
  getAddressAll,
  getAddressByUser,
  postAddress,
} from "../Controllers/address.controller.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const addressRoute = express.Router();

addressRoute.get("/all", protect, admin, getAddressAll);
addressRoute.get("/:id", protect, getAddressByUser);
addressRoute.post("/", protect, postAddress);

export default addressRoute;
