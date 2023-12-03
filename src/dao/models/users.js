import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: "user",
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    },
    role:{
        type: String,
        enum: ["user", "admin", "premium"],
        default: "user",
    },
    resetPasswordToken: {
        type:String,
    },

    resetPasswordExpires: {
        type: Date,}
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
