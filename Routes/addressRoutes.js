import express from "express";
import { getAddressAll, getAddressByUser, postAddress } from "../Controllers/address.controller.js";

const addressRoute = express.Router();

addressRoute.get("/all", getAddressAll);
addressRoute.get("/:id", getAddressByUser);
addressRoute.post("/", postAddress);

export default addressRoute;
