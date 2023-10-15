import express from "express";
// import { admin, protect } from "../Middleware/AuthMiddleware.js";

import {
    getProducts,
    getProductsAll,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct
} from "../Controllers/Products.controller.js";
import { protect } from "../Middleware/AuthMiddleware.js";


const productsRoute = express.Router();

productsRoute.get("/",protect, getProducts);
productsRoute.get("/all",protect, getProductsAll);
productsRoute.get("/:id", getProductId);
productsRoute.post("/", postProduct);
productsRoute.put("/:id", putProduct);
productsRoute.delete(":id", deleteProduct);

export default productsRoute;