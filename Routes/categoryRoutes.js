import express from "express";
import {
  getCategoryAll,
  postCategory,
} from "../Controllers/category.controller.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const categoryRoute = express.Router();

categoryRoute.get("/all", protect, getCategoryAll),
categoryRoute.post("/", protect, postCategory);

export default categoryRoute;
