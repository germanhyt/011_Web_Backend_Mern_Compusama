import express from "express";

import {
    getReviewsByProduct,
    postReview
} from "../Controllers/reviews.controller.js";

const reviewsRoute = express.Router();

reviewsRoute.get("/:id", getReviewsByProduct);
reviewsRoute.post("/", postReview);
// reviewsRoute.post("/:id", postReview);

export default reviewsRoute;