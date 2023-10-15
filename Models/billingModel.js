import mongoose from "mongoose";

const billingSchema = mongoose.Schema(
    {
        id_order: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Orders"
        },
        number_billing: { type: Number, require: true },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
)

const Billing = mongoose.model("Billing", billingSchema);

export default Billing;