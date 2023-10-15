import express from "express";
import Subcategory from "../Models/subcategoryModel.js";
import { getSubcategoryAll, postSubcategory } from "../Controllers/subcategory.controller.js";

const subcategoryRoute = express.Router();

subcategoryRoute.get("/all", getSubcategoryAll);
subcategoryRoute.post("/", postSubcategory);

export default subcategoryRoute;
