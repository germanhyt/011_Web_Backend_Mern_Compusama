import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
    {
        id_billing: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Billing"
        },
        method: { type: String, require: true },
        amount_total: { type: Number, require: false },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
)

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;