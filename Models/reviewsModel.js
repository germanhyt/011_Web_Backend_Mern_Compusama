import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
    {
        id_product: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Products"
        },
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Users"
        },
        name: { type: String, require: true },
        rating: { type: Number, require: false },
        comment: { type: String, require: false },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
);

const Reviews = mongoose.model("Reviews", reviewsSchema,"reviews");

export default Reviews;

