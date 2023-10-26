import express from "express";
import { getStockAll, getStockByProduct, postStock } from "../Controllers/stock.controller.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const stockRoute = express.Router();

stockRoute.get("/all",protect,admin, getStockAll);
stockRoute.get("/:id",protect, getStockByProduct);
stockRoute.post("/",protect, postStock);

export default stockRoute;


