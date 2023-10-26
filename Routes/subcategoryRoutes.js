import express from "express";
import {
  getSubcategoriesByCategory,
  getSubcategoryAll,
  postSubcategory,
} from "../Controllers/subcategory.controller.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const subcategoryRoute = express.Router();

subcategoryRoute.get("/all",protect, getSubcategoryAll);
subcategoryRoute.get("/:id",protect, getSubcategoriesByCategory);
subcategoryRoute.post("/",protect, postSubcategory);

export default subcategoryRoute;
