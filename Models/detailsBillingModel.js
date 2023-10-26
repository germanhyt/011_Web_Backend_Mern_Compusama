import mongoose from "mongoose";

const detailsBillingModel = mongoose.Schema(
    {
        id_billing: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Billing"
        },
        id_product: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Products"
        },
        quantity: { type: Number, require: true },
        price: { type: Number, require: true },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
);

const DetailsBilling = mongoose.model("Details_billing", detailsBillingModel, "details_billing");

export default DetailsBilling;