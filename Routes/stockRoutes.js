import express from "express";
import { getStockAll, getStockByProduct, postStock } from "../Controllers/stock.controller.js";

const stockRoute = express.Router();

stockRoute.get("/all", getStockAll);
stockRoute.get("/:id", getStockByProduct);
stockRoute.post("/", postStock);

export default stockRoute;


