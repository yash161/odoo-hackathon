import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide the username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide the password"],
    },
    designation: {
        type: String,
        required: [true, "Please provide the designation"]
    },
    employee_id: {
        type: Number,
        required : [true],
    },
    verification_code: {
        type: String,
    },
    forgot_password: {
        type: String,
    },
    department : {
        type : String,
        required : [true]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },


})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User
