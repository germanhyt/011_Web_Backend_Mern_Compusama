import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Users"
        },
        address:{type: String, require: true },
        street:{type: String, require: false },
        street_number:{type: Number, require: false },
        floor:{type: String, require: false },
        department:{type: String, require: false },
        province:{type: String, require: false },
        district:{type: String, require: false },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
);

const Address = mongoose.model("Address", addressSchema,"address");

export default Address;