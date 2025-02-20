import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        match: /^[a-zA-Z ]+$/, // only allows alphabetic characters and spaces
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role:{
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }
}, {timestamps: true});
const User = mongoose.model('User',userSchema);

export default User;