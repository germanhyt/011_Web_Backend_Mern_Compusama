import mongoose from "mongoose";

const detailsOrderSchema = mongoose.Schema(
    {
        id_order: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Orders"
        },
        id_product: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Products"
        },
        quantity: { type: Number, require: true },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
)

const DetailsOrder = mongoose.model("Details_order", detailsOrderSchema, "details_order");

export default DetailsOrder;