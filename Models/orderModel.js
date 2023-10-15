import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Users"
        },
        id_business: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Business"
        },
        id_address: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Address"
        },
        state_order: { type: String, require: true },
        date_delivery: { type: String, require: true },
        date_promised: { type: String, require: true },
        total: { type: Number, require: true },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
);

const Order = mongoose.model("Orders", orderSchema);

export default Order;