import mongoose from "mongoose";

const businessSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        email: { type: String, require: false },
        phone: { type: String, require: false },
        address: { type: String, require: false },
        image: { type: String, require: false },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
)

const Business = mongoose.model("Business", businessSchema,"business");

export default Business;