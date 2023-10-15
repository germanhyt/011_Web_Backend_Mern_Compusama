import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        email: { type: String, require: true },
        password: { type: String, require: true },
        name: { type: String, require: true },
        lastname: { type: String, require: false },
        phone: { type: String, require: false },
        image: { type: String, require: false },
        is_available: { type: Boolean, require: true },
        session_token: { type: String, require: true },
        created_at: { type: String, require: false },
        updated_at: { type: String, require: false }
    }
);

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Falló el hash del password' });
        // throw new Error("Falló el hash del password");
    }

});

userSchema.methods.comparePassword = async function (clientPassword) {
    console.log(clientPassword);
    return await bcryptjs.compare(clientPassword, this.password);
};

const User = mongoose.model("Users", userSchema);

export default User;