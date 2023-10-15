import mongoose from "mongoose";

const stockSchema = mongoose.Schema(
    {
        id_product: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Products"
        },
        quantity: { type: Number, require: true },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
);

const Stock = mongoose.model("Stock", stockSchema, "stock");

export default Stock; 