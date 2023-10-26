import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        discount: { type: Number, require: true },
        image: { type: String, require: true },
        created_at: { type: String, require: true },
        updated_at: { type: String, require: true }
    }
);

const Category = mongoose.model("Category", categorySchema,"category");

export default Category;