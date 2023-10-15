import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema(
    {
        id_category: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Category"
        },
        name: { type: String, require: true },
        description: { type: String, require: true },
        discount: { type: Number, require: true },
        image: { type: String, require: true },
        created_at: { type: String, require: true },
        updated_at: { type: String, require: true }
    }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema, "subcategory");

export default Subcategory;