import express from "express";
// import { admin, protect } from "../Middleware/AuthMiddleware.js";

import {
  getProducts,
  getProductsAll,
  getProductId,
  postProduct,
  putProduct,
  deleteProduct,
} from "../Controllers/Products.controller.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
// import { protect } from "../Middleware/AuthMiddleware.js";

const productsRoute = express.Router();

productsRoute.get("/", getProducts);
productsRoute.get("/all", getProductsAll);
productsRoute.get("/:id", getProductId);
productsRoute.post("/", protect, admin, postProduct);
productsRoute.put("/", protect, admin, putProduct);
productsRoute.delete("/:id", protect, admin, deleteProduct);

export default productsRoute;
