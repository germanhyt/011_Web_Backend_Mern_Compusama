import express from "express";

import {
  getReviewsByProduct,
  postReview,
} from "../Controllers/reviews.controller.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const reviewsRoute = express.Router();

reviewsRoute.get("/:id", protect, getReviewsByProduct);
reviewsRoute.post("/", protect, postReview);

export default reviewsRoute;
