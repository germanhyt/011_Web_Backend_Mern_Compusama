import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
)

const Brand = mongoose.model("Brand", brandSchema,"brand");

export default Brand;