import express from "express";
import { getBrandAll, postBrand } from "../Controllers/brand.controller.js";

const brandRoute = express.Router();

brandRoute.get("/all", getBrandAll);
brandRoute.post("/", postBrand);

export default brandRoute;
