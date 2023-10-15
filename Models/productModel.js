import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        id_subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Subcategory",
        },
        id_brand: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Brand",
        },
        code: { type: Number, require: true },
        name: { type: String, require: true },
        description: { type: String, require: true },
        price: { type: Number, require: true },
        stock_minimun: { type: Number, require: false },
        discount: { type: Number, require: false },
        image1: { type: String, require: false },
        image2: { type: String, require: false },
        image3: { type: String, require: false },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    },

);

const Product = mongoose.model("Products", productSchema);

export default Product;


