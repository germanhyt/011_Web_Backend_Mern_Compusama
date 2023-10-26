import mongoose from "mongoose";

const rolesSchema = mongoose.Schema(
    {
        id_user:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User"
        },
        name: { type: String, require: true },
        description: { type: String, require: true },
        image: { type: String, require: false },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
)

const Roles = mongoose.model("Roles", rolesSchema);

export default Roles;

